'use client';

import { createContext, use, useReducer, useRef } from 'react';
import { ThreatGauge } from '../ThreatGauge';
import { Check } from 'lucide-react';

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
    <form className="flex flex-col gap-6 max-w-[640px] w-full" onSubmit={submit}>
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
    className: "bg-[var(--surface-container-highest)] border border-transparent p-[0.75rem_1rem] rounded-md text-[var(--on-surface)] text-[0.875rem] transition-all duration-150 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] placeholder:text-[var(--on-surface-variant)] placeholder:opacity-50",
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`field-${fieldName}`} className="font-['Inter',sans-serif] text-[0.875rem] font-medium text-[var(--on-surface)]">
        {label}
        {required && <span className="text-[var(--primary)] font-bold"> *</span>}
      </label>
      {as === 'textarea' ? (
        <textarea {...sharedProps} rows={4} className={`${sharedProps.className} resize-y min-h-[100px]`} />
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
    <div className="flex flex-col gap-2">
      <label htmlFor={`field-${fieldName}`} className="font-['Inter',sans-serif] text-[0.875rem] font-medium text-[var(--on-surface)]">
        {label}
        {required && <span className="text-[var(--primary)] font-bold"> *</span>}
      </label>
      <select
        id={`field-${fieldName}`}
        value={state[fieldName] ?? ''}
        onChange={(e) => setField(fieldName, e.target.value)}
        required={required}
        className="bg-[var(--surface-container-highest)] border border-transparent p-[0.75rem_1rem] rounded-md text-[var(--on-surface)] text-[0.875rem] transition-all duration-150 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] appearance-none bg-no-repeat bg-[position:right_1rem_top_50%] bg-[size:0.65em_auto] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23e2e3df%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]"
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
    <div className="flex flex-col gap-2">
      <label className="font-['Inter',sans-serif] text-[0.875rem] font-medium text-[var(--on-surface)]">Evidência Visual</label>
      <div
        className="border-2 border-dashed border-[rgba(90,65,56,0.4)] rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)] hover:border-[var(--outline)]"
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
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {state.images.length > 0 ? (
          <div className="flex flex-wrap gap-4 w-full">
            {state.images.map((src, i) => (
              <img key={i} src={src} alt={`preview ${i + 1}`} className="w-20 h-20 object-cover rounded-md border border-[var(--outline-variant)]" />
            ))}
            <div className="w-20 h-20 flex items-center justify-center rounded-md border border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-highest)] text-[var(--on-surface-variant)] text-[0.75rem]">
              <span>+ Adicionar</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-[2rem] mb-2">📸</span>
            <span className="font-medium text-[var(--on-surface)]">Arraste imagens ou clique para selecionar</span>
            <span className="text-[0.75rem] text-[var(--on-surface-variant)]">JPG ou RAW de alta resolução recomendado</span>
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
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="font-['Inter',sans-serif] text-[0.875rem] font-medium text-[var(--on-surface)]">Dados Geoespaciais</label>
        <button type="button" className="text-[0.75rem] text-[var(--primary)] bg-[rgba(255,87,34,0.1)] border border-[rgba(255,87,34,0.2)] p-[0.25rem_0.75rem] rounded-full font-semibold hover:bg-[rgba(255,87,34,0.2)]" onClick={getLocation}>
          📍 Usar minha localização
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          className="bg-[var(--surface-container-highest)] border border-transparent p-[0.75rem_1rem] rounded-md text-[var(--on-surface)] text-[0.875rem] transition-all duration-150 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] placeholder:text-[var(--on-surface-variant)] placeholder:opacity-50"
          type="text"
          placeholder="Latitude (ex: -23.5505)"
          value={state.latitude}
          onChange={(e) => setField('latitude', e.target.value)}
        />
        <input
          className="bg-[var(--surface-container-highest)] border border-transparent p-[0.75rem_1rem] rounded-md text-[var(--on-surface)] text-[0.875rem] transition-all duration-150 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] placeholder:text-[var(--on-surface-variant)] placeholder:opacity-50"
          type="text"
          placeholder="Longitude (ex: -46.6333)"
          value={state.longitude}
          onChange={(e) => setField('longitude', e.target.value)}
        />
      </div>
      <input
        className="bg-[var(--surface-container-highest)] border border-transparent p-[0.75rem_1rem] rounded-md text-[var(--on-surface)] text-[0.875rem] transition-all duration-150 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] placeholder:text-[var(--on-surface-variant)] placeholder:opacity-50 w-full"
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
    <div className="flex flex-col gap-2">
      <label className="font-['Inter',sans-serif] text-[0.875rem] font-medium text-[var(--on-surface)]">Nível de Ameaça</label>
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
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`toggle-${fieldName}`}
        checked={!!state[fieldName]}
        onChange={(e) => setField(fieldName, e.target.checked)}
        className="hidden peer"
      />
      <label htmlFor={`toggle-${fieldName}`} className="flex items-center gap-3 cursor-pointer text-[0.875rem] text-[var(--on-surface)] group">
        <span className="relative w-10 h-6 bg-[var(--surface-container-highest)] rounded-full transition-colors duration-150 peer-checked:bg-[var(--primary-container)] group-has-[:checked]:bg-[var(--primary-container)]">
          <span className={`absolute top-[2px] left-[2px] w-5 h-5 bg-[var(--on-surface-variant)] rounded-full transition-all duration-150 ${state[fieldName] ? 'translate-x-4 bg-[var(--surface)]' : ''}`} />
        </span>
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
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--on-primary)] font-['Inter',sans-serif] font-semibold text-base p-4 rounded-md flex items-center justify-center gap-2 mt-4 transition-all duration-150 hover:not(:disabled):-translate-y-[2px] hover:not(:disabled):shadow-[0_4px_20px_rgba(255,87,34,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={state.submitting}
    >
      {state.submitting ? (
        <span className="w-5 h-5 border-2 border-[rgba(95,21,0,0.3)] border-t-[var(--on-primary)] rounded-full animate-[spin_1s_linear_infinite]" />
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
    <div className="flex flex-col items-center text-center p-[3rem_1.5rem] bg-[var(--surface-container-low)] border border-[rgba(90,65,56,0.2)] rounded-xl max-w-[500px] mx-auto w-full">
      <div className="text-[4rem] mb-4"><Check size={64} className="p-2 bg-green-500 rounded-full" /></div>
      <h2 className="text-[1.5rem] text-[var(--primary)] mb-2">Incidente Registrado</h2>
      <p className="text-[var(--on-surface-variant)] mb-6">
        A Estação de Monitoramento 01 recebeu seus dados e está despachando unidades de verificação.
      </p>
      <p className="font-['Courier_New',Courier,monospace] text-[0.75rem] text-[var(--secondary)] bg-[rgba(136,217,130,0.1)] p-[0.25rem_0.75rem] rounded-sm">Agradecemos sua colaboração!</p>
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
