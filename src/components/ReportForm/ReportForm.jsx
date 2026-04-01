'use client';

import { createContext, use, useReducer, useRef } from 'react';
import { ThreatGauge } from '../ThreatGauge';
import styles from './ReportForm.module.css';

/* ──────────────────────────────────────────────
   State & Reducer (lifted into Provider)
   ────────────────────────────────────────────── */
const initialState = {
  incidentType: '',
  description: '',
  latitude: '',
  longitude: '',
  location: '',
  severity: 'moderate',
  anonymous: false,
  images: [],
  submitted: false,
  submitting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_IMAGES':
      return { ...state, images: action.images };
    case 'SUBMIT_START':
      return { ...state, submitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, submitting: false, submitted: true };
    default:
      return state;
  }
}

/* ──────────────────────────────────────────────
   Context
   ────────────────────────────────────────────── */
const ReportFormContext = createContext(null);

function useReportForm() {
  const ctx = use(ReportFormContext);
  if (!ctx) throw new Error('ReportForm subcomponents must be inside <ReportForm.Provider>');
  return ctx;
}

/* ──────────────────────────────────────────────
   ReportForm.Provider — state lifted here
   ────────────────────────────────────────────── */
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setField(field, value) {
    dispatch({ type: 'SET_FIELD', field, value });
  }

  async function submit(e) {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1800));
    dispatch({ type: 'SUBMIT_SUCCESS' });
  }

  return (
    <ReportFormContext value={{ state, setField, submit, dispatch }}>
      {children}
    </ReportFormContext>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Frame
   ────────────────────────────────────────────── */
function Frame({ children }) {
  const { submit } = useReportForm();
  return (
    <form className={styles.frame} onSubmit={submit}>
      {children}
    </form>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Field
   ────────────────────────────────────────────── */
function Field({ label, fieldName, type = 'text', placeholder, required = false, as = 'input' }) {
  const { state, setField } = useReportForm();

  const sharedProps = {
    id: `field-${fieldName}`,
    value: state[fieldName] ?? '',
    onChange: (e) => setField(fieldName, e.target.value),
    placeholder,
    required,
    className: styles.fieldInput,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={`field-${fieldName}`} className={styles.fieldLabel}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      {as === 'textarea' ? (
        <textarea {...sharedProps} rows={4} className={`${styles.fieldInput} ${styles.fieldTextarea}`} />
      ) : as === 'select' ? null : (
        <input {...sharedProps} type={type} />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Select
   ────────────────────────────────────────────── */
function Select({ label, fieldName, options = [], required = false }) {
  const { state, setField } = useReportForm();
  return (
    <div className={styles.field}>
      <label htmlFor={`field-${fieldName}`} className={styles.fieldLabel}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      <select
        id={`field-${fieldName}`}
        value={state[fieldName] ?? ''}
        onChange={(e) => setField(fieldName, e.target.value)}
        required={required}
        className={`${styles.fieldInput} ${styles.fieldSelect}`}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Upload
   ────────────────────────────────────────────── */
function Upload() {
  const { state, dispatch } = useReportForm();
  const inputRef = useRef(null);

  function handleFiles(files) {
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    dispatch({ type: 'SET_IMAGES', images: [...state.images, ...urls] });
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>Evidência Visual</label>
      <div
        className={styles.upload}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className={styles.uploadInput}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {state.images.length > 0 ? (
          <div className={styles.uploadPreviews}>
            {state.images.map((src, i) => (
              <img key={i} src={src} alt={`preview ${i + 1}`} className={styles.uploadPreview} />
            ))}
            <div className={styles.uploadPlaceholder}>
              <span>+ Adicionar</span>
            </div>
          </div>
        ) : (
          <div className={styles.uploadEmpty}>
            <span className={styles.uploadIcon}>📸</span>
            <span className={styles.uploadText}>Arraste imagens ou clique para selecionar</span>
            <span className={styles.uploadHint}>JPG ou RAW de alta resolução recomendado</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Location
   ────────────────────────────────────────────── */
function Location() {
  const { state, setField } = useReportForm();

  function getLocation() {
    navigator.geolocation?.getCurrentPosition((pos) => {
      setField('latitude', pos.coords.latitude.toFixed(6));
      setField('longitude', pos.coords.longitude.toFixed(6));
    });
  }

  return (
    <div className={styles.field}>
      <div className={styles.fieldLabelRow}>
        <label className={styles.fieldLabel}>Dados Geoespaciais</label>
        <button type="button" className={styles.locationBtn} onClick={getLocation}>
          📍 Usar minha localização
        </button>
      </div>
      <div className={styles.locationGrid}>
        <input
          className={styles.fieldInput}
          type="text"
          placeholder="Latitude (ex: -23.5505)"
          value={state.latitude}
          onChange={(e) => setField('latitude', e.target.value)}
        />
        <input
          className={styles.fieldInput}
          type="text"
          placeholder="Longitude (ex: -46.6333)"
          value={state.longitude}
          onChange={(e) => setField('longitude', e.target.value)}
        />
      </div>
      <input
        className={`${styles.fieldInput} ${styles.locationFull}`}
        type="text"
        placeholder="Descrição da localização (região, cidade, referência)"
        value={state.location}
        onChange={(e) => setField('location', e.target.value)}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Severity
   ────────────────────────────────────────────── */
function Severity() {
  const { state, setField } = useReportForm();

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>Nível de Ameaça</label>
      <ThreatGauge.Root level={state.severity} onChange={(v) => setField('severity', v)}>
        <ThreatGauge.Bar interactive />
        <ThreatGauge.Label />
        <ThreatGauge.Selector value={state.severity} onChange={(v) => setField('severity', v)} />
      </ThreatGauge.Root>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Toggle — anonymous checkbox
   ────────────────────────────────────────────── */
function Toggle({ fieldName, label }) {
  const { state, setField } = useReportForm();
  return (
    <div className={styles.toggle}>
      <input
        type="checkbox"
        id={`toggle-${fieldName}`}
        checked={!!state[fieldName]}
        onChange={(e) => setField(fieldName, e.target.checked)}
        className={styles.toggleInput}
      />
      <label htmlFor={`toggle-${fieldName}`} className={styles.toggleLabel}>
        <span className={styles.toggleSwitch} />
        {label}
      </label>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Submit
   ────────────────────────────────────────────── */
function Submit({ label = 'Enviar Relatório' }) {
  const { state } = useReportForm();
  return (
    <button
      type="submit"
      className={styles.submit}
      disabled={state.submitting}
    >
      {state.submitting ? (
        <span className={styles.submitSpinner} />
      ) : (
        <>🔥 {label}</>
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.Success
   ────────────────────────────────────────────── */
function Success() {
  return (
    <div className={styles.success}>
      <div className={styles.successIcon}>✅</div>
      <h2 className={styles.successTitle}>Incidente Registrado</h2>
      <p className={styles.successText}>
        O Sentinel Monitoring Station 01 recebeu seus dados e está despachando unidades de verificação.
      </p>
      <p className={styles.successProtocol}>Protocol 09-Beta • Criptografia Ativada</p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ReportForm.StateGate — render based on state
   ────────────────────────────────────────────── */
function StateGate({ children, fallback }) {
  const { state } = useReportForm();
  if (state.submitted) return fallback ?? <Success />;
  return children;
}

/* ──────────────────────────────────────────────
   Export
   ────────────────────────────────────────────── */
export {
  Provider,
  Frame,
  Field,
  Select,
  Upload,
  Location,
  Severity,
  Toggle,
  Submit,
  Success,
  StateGate,
};
