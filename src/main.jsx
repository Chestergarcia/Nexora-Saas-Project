import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CircleDollarSign,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Headphones,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Store,
  Trash2,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import './styles.css'

const STORAGE_KEY = 'nexora.workspace-app.v1'
const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Orders', icon: ShoppingBag },
  { name: 'Products', icon: Package },
  { name: 'Analytics', icon: SlidersHorizontal },
  { name: 'Payments', icon: CreditCard },
]

const seedOrders = [
  { id: 'NX-1048', customer: 'Olivia Rhye', product: 'Everyday Tote', date: 'May 27, 2024', total: 84, status: 'Completed' },
  { id: 'NX-1047', customer: 'Phoenix Baker', product: 'Nexora Essentials', date: 'May 26, 2024', total: 120, status: 'Processing' },
  { id: 'NX-1046', customer: 'Lana Steiner', product: 'Classic Hoodie', date: 'May 25, 2024', total: 68, status: 'Pending' },
  { id: 'NX-1045', customer: 'Demi Wilkinson', product: 'Everyday Tote', date: 'May 24, 2024', total: 42, status: 'Completed' },
  { id: 'NX-1044', customer: 'Candice Wu', product: 'Nexora Essentials', date: 'May 23, 2024', total: 96, status: 'Cancelled' },
]

const seedProducts = [
  { id: 'P-01', name: 'Everyday Tote', category: 'Accessories', price: 42, stock: 38 },
  { id: 'P-02', name: 'Nexora Essentials', category: 'Collection', price: 60, stock: 124 },
  { id: 'P-03', name: 'Classic Hoodie', category: 'Apparel', price: 68, stock: 9 },
]

const blankData = { account: null, workspaces: [], activeWorkspaceId: null }

function readData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (!stored || typeof stored !== 'object') return blankData
    return {
      ...blankData,
      ...stored,
      account: stored.account ? { name: stored.account.name, email: stored.account.email } : null,
    }
  } catch {
    return blankData
  }
}

function saveData(data) {
  const account = data.account ? { name: data.account.name, email: data.account.email } : null
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, account }))
}

function currencySymbol(currency) {
  return currency === 'PHP' ? '₱' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
}

function makeWorkspace(name, category, currency, goal) {
  return {
    id: crypto.randomUUID(),
    name,
    category,
    currency,
    goal,
    createdAt: new Date().toISOString(),
    orders: seedOrders.map(order => ({ ...order })),
    products: seedProducts.map(product => ({ ...product })),
  }
}

function Brand({ light = false }) {
  return (
    <div className={`brand${light ? ' brand-light' : ''}`}>
      <svg className="brand-symbol" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M7.1 24.7c.8-4.1 7.8-10.2 16.3-14.4 6.3-3.1 13.4-5.3 15.1-4.4 1.7 1-3.3 7.4-10.1 13.8-7 6.5-15.9 12.5-19.3 11.6-1.6-.4-2.4-3.1-2-6.6Z" fill="#0759bd" />
        <path d="M12.1 39.5c1.2-4.7 6.9-11.4 13.2-16.5 2.4-2 5.3-3.7 6-2.7.7 1.1-2.3 7.2-6.4 12.8-4.1 5.5-9.2 10.1-11.5 9.1-1.2-.5-1.7-1.4-1.3-2.7Z" fill="#5a9df4" />
      </svg>
      <span>Nexora</span>
    </div>
  )
}

function AuthArtwork() {
  return (
    <aside className="auth-art">
      <div className="art-glow art-glow-one" />
      <div className="art-glow art-glow-two" />
      <Brand light />
      <div className="art-message">
        <span className="art-kicker"><Sparkles size={14} /> YOUR BUSINESS, IN SYNC</span>
        <h2>Make room for<br />what's next.</h2>
        <p>One calm, clear place for the work that moves your business forward.</p>
      </div>
      <div className="art-dashboard">
        <div className="art-dash-head"><span>Store overview</span><span className="art-live"><i /> Live</span></div>
        <div className="art-stat-row"><div><small>Total revenue</small><strong>$24,580</strong></div><span className="art-growth"><ArrowUpRight size={13} /> 18.6%</span></div>
        <div className="art-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><svg viewBox="0 0 300 80" preserveAspectRatio="none"><path d="M0 67 C25 62 30 55 55 59 S86 47 108 52 S136 38 160 44 S190 26 215 34 S246 20 267 22 S286 7 300 9" /></svg></div>
        <div className="art-dash-foot"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
      </div>
      <div className="art-note"><span className="art-note-icon"><Check size={15} /></span><span><strong>Looking good!</strong><small>Your store is growing this month.</small></span><ArrowUpRight size={17} /></div>
      <div className="art-caption">Thoughtfully made for people who make things happen.</div>
    </aside>
  )
}

function AuthScreen({ onAccount, onComplete, existingAccount, initialMode, onBack }) {
  const [mode, setMode] = useState(initialMode || (existingAccount ? 'login' : 'signup'))
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function update(key, value) {
    setForm(current => ({ ...current, [key]: value }))
    setError('')
  }

  function submit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    const email = form.email.trim().toLowerCase()
    if (mode === 'signup') {
      if (existingAccount?.email === email) {
        setError('That local demo account already exists. Sign in instead.')
        return
      }
      if (form.password.length < 8) {
        setError('Use at least 8 characters for your password.')
        return
      }
      onAccount({ name: form.name.trim(), email })
      onComplete()
      return
    }
    if (mode === 'login') {
      if (!existingAccount || existingAccount.email !== email) {
        setError('No local demo account matches that email. Create an account on this browser first.')
        return
      }
      onComplete()
      return
    }
    setNotice(`Password reset emails are not available in this frontend-only demo. No email was sent to ${email}.`)
  }

  return (
    <main className="auth-layout">
      <AuthArtwork />
      <section className="auth-panel">
        <div className="auth-mobile-brand"><Brand /></div>
        <div className="auth-form-wrap">
          <button className="form-inline-link auth-back" type="button" onClick={onBack}><ArrowRight size={13} /> Back to Nexora</button>
          {mode === 'signup' && <><span className="form-eyebrow">GET STARTED</span><h1>Create your account</h1><p className="form-subtitle">A better way to run your business starts here.</p></>}
          {mode === 'login' && <><span className="form-eyebrow">WELCOME BACK</span><h1>Sign in to Nexora</h1><p className="form-subtitle">Pick up right where you left off.</p></>}
          {mode === 'forgot' && <><span className="form-eyebrow">ACCOUNT RECOVERY</span><h1>Forgot your password?</h1><p className="form-subtitle">Enter the email you used to create your account.</p></>}
          <form className="auth-form" onSubmit={submit}>
            {mode === 'signup' && <label>Full name<input autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} placeholder="Your name" required /></label>}
            <label>Email address<input type="email" autoComplete="email" value={form.email} onChange={event => update('email', event.target.value)} placeholder="you@company.com" required /></label>
            {mode === 'signup' && <label>Password<input type="password" autoComplete="new-password" value={form.password} onChange={event => update('password', event.target.value)} placeholder="At least 8 characters" minLength={8} required /></label>}
            {mode === 'login' && <p className="demo-access-note">Local demo access uses your email only. No password is stored or verified.</p>}
            {mode === 'login' && <button className="form-inline-link forgot-link" type="button" onClick={() => { setMode('forgot'); setNotice(''); setError('') }}>Forgot password?</button>}
            {error && <p className="form-message form-error" role="alert">{error}</p>}
            {notice && <p className="form-message form-success" role="status">{notice}</p>}
            <button className="button button-primary auth-submit" type="submit">{mode === 'signup' ? 'Create account' : mode === 'login' ? 'Sign in' : 'Send reset link'} <ArrowRight size={16} /></button>
          </form>
          {mode === 'signup' && <p className="legal-note">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>}
          <p className="auth-switch">{mode === 'login' ? 'New to Nexora?' : mode === 'forgot' ? 'Remember your password?' : 'Already have an account?'} <button className="form-inline-link" type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setNotice(''); setError('') }}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
          <p className="demo-caption">Demo mode · Stored locally on this device</p>
        </div>
        <span className="auth-copyright">© 2024 Nexora, Inc.</span>
      </section>
    </main>
  )
}

function Onboarding({ onFinish, onCancel }) {
  const [step, setStep] = useState(0)
  const [details, setDetails] = useState({ store: '', category: '', currency: 'USD', goal: '' })
  const [error, setError] = useState('')
  const steps = ['Your workspace', 'About your business', 'Make it yours']
  const categories = ['Retail & ecommerce', 'Creative studio', 'Professional services', 'Food & beverage', 'Other']
  const goals = ['Organize my business', 'Manage online orders', 'Grow my customer base', 'Understand my sales']

  function change(key, value) {
    setDetails(current => ({ ...current, [key]: value }))
    setError('')
  }

  function next() {
    if (step === 0 && !details.store.trim()) {
      setError('Give your workspace a name to continue.')
      return
    }
    if (step === 1 && !details.category) {
      setError('Choose the type of business that best describes you.')
      return
    }
    if (step < 2) {
      setStep(current => current + 1)
      return
    }
    onFinish(details)
  }

  return (
    <main className={`onboarding-screen${onCancel ? ' onboarding-modal' : ''}`}>
      <header className="onboarding-top"><Brand /><div>{onCancel && <button className="form-inline-link onboarding-cancel" type="button" onClick={onCancel}>Cancel</button>}<span>SETUP · {step + 1} OF 3</span></div></header>
      <div className="onboarding-progress" aria-label={`Step ${step + 1} of 3`}><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      <section className="onboarding-card">
        <div className="step-indicators">{steps.map((label, index) => <div className={`step-indicator${index === step ? ' current' : ''}${index < step ? ' done' : ''}`} key={label}><span>{index < step ? <Check size={14} /> : index + 1}</span><small>{label}</small></div>)}</div>
        {step === 0 && <><span className="form-eyebrow">LET'S GET YOU SET UP</span><h1>What should we call<br />your workspace?</h1><p className="form-subtitle">This is the home for your team, store, and the work you do together.</p><label className="onboarding-label">Workspace name<input autoFocus value={details.store} onChange={event => change('store', event.target.value)} placeholder="e.g. Sunday Goods" onKeyDown={event => { if (event.key === 'Enter') next() }} /></label></>}
        {step === 1 && <><span className="form-eyebrow">A LITTLE ABOUT YOU</span><h1>What kind of business<br />are you building?</h1><p className="form-subtitle">We’ll tailor your Nexora workspace to fit your world.</p><div className="choice-grid">{categories.map((category, index) => <button className={`choice-card${details.category === category ? ' selected' : ''}`} type="button" key={category} onClick={() => change('category', category)}><span className="choice-icon">{[<Store size={18} />, <Sparkles size={18} />, <Users size={18} />, <ShoppingBag size={18} />, <CircleHelp size={18} />][index]}</span><span>{category}</span>{details.category === category && <Check size={16} />}</button>)}</div></>}
        {step === 2 && <><span className="form-eyebrow">MADE FOR YOUR NEXT CHAPTER</span><h1>What would you like<br />to focus on first?</h1><p className="form-subtitle">Choose what matters most. You can always change this later.</p><div className="goal-list">{goals.map(goal => <button className={`goal-choice${details.goal === goal ? ' selected' : ''}`} key={goal} type="button" onClick={() => change('goal', goal)}><span className="goal-check">{details.goal === goal && <Check size={14} />}</span>{goal}</button>)}</div><label className="currency-select">Store currency<select value={details.currency} onChange={event => change('currency', event.target.value)}><option value="USD">USD · US Dollar</option><option value="PHP">PHP · Philippine Peso</option><option value="EUR">EUR · Euro</option><option value="GBP">GBP · British Pound</option></select></label></>}
        {error && <p className="form-message form-error" role="alert">{error}</p>}
        <div className="onboarding-actions">{step > 0 && <button className="button button-outline" type="button" onClick={() => { setStep(current => current - 1); setError('') }}>Back</button>}<button className="button button-primary" type="button" onClick={next}>{step === 2 ? 'Create my workspace' : 'Continue'} <ArrowRight size={16} /></button></div>
        <p className="demo-caption">Step {step + 1} of 3 · Your workspace is saved on this device</p>
      </section>
    </main>
  )
}

function WorkspaceMenu({ workspaces, active, onSelect, onAdd }) {
  const [open, setOpen] = useState(false)
  return <div className="workspace-picker-wrap">
    <button className="workspace-picker" type="button" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span className="workspace-avatar">{active?.name?.slice(0, 1).toUpperCase() || 'N'}</span>
      <span className="workspace-copy"><strong>{active?.name || 'Your workspace'}</strong><small>{active?.category || 'Workspace'}</small></span>
      <ChevronDown size={16} className={open ? 'rotated' : ''} />
    </button>
    {open && <><button className="menu-dismiss" type="button" onClick={() => setOpen(false)} aria-label="Close workspace menu" /><div className="workspace-menu"><small className="menu-label">YOUR WORKSPACES</small>{workspaces.map(workspace => <button className={`workspace-option${workspace.id === active?.id ? ' selected' : ''}`} key={workspace.id} type="button" onClick={() => { onSelect(workspace.id); setOpen(false) }}><span className="workspace-avatar">{workspace.name.slice(0, 1).toUpperCase()}</span><span><strong>{workspace.name}</strong><small>{workspace.category}</small></span>{workspace.id === active?.id && <Check size={15} />}</button>)}<button className="add-workspace-option" type="button" onClick={() => { setOpen(false); onAdd() }}><Plus size={16} /> Add a workspace</button></div></>}
  </div>
}

function Sidebar({ page, setPage, workspaces, active, onSelectWorkspace, onAddWorkspace, profile, onLogout, open, onClose }) {
  return <>
    {open && <button className="sidebar-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar${open ? ' is-open' : ''}`}>
      <div className="sidebar-head"><Brand /><button className="icon-button sidebar-close" type="button" aria-label="Close navigation" onClick={onClose}><X size={19} /></button></div>
      <WorkspaceMenu workspaces={workspaces} active={active} onSelect={onSelectWorkspace} onAdd={onAddWorkspace} />
      <p className="nav-heading">WORKSPACE</p>
      <nav className="sidebar-nav" aria-label="Workspace navigation">{navItems.map(({ name, icon: Icon }) => <button className={`nav-link${page === name ? ' active' : ''}`} type="button" key={name} onClick={() => { setPage(name); onClose() }} aria-current={page === name ? 'page' : undefined}><Icon size={18} strokeWidth={1.8} /><span>{name}</span>{name === 'Orders' && active?.orders?.length > 0 && <span className="nav-count">{active.orders.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="help-card"><span className="help-icon"><CircleHelp size={17} /></span><strong>Need a hand?</strong><p>Find answers and tips for your workspace.</p><a href="#help">Visit help center <ArrowRight size={14} /></a></div>
        <button className={`nav-link${page === 'Settings' ? ' active' : ''}`} type="button" onClick={() => { setPage('Settings'); onClose() }}><Settings size={18} /><span>Settings</span></button>
        <button className="profile-link" type="button" onClick={onLogout}><span className="profile-avatar">{profile?.name?.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'N'}</span><span className="profile-copy"><strong>{profile?.name || 'Nexora user'}</strong><small>{profile?.email || 'Workspace owner'}</small></span><LogOut size={17} /></button>
      </div>
    </aside>
  </>
}

function Header({ page, search, setSearch, onMenu, onLogout }) {
  const [noticeOpen, setNoticeOpen] = useState(false)
  return <header className="topbar"><div className="topbar-leading"><button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={onMenu}><Menu size={21} /></button><div className="breadcrumb"><span>Nexora</span><span>/</span><strong>{page}</strong></div></div><div className="topbar-actions"><label className="search-field"><Search size={17} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search anything..." aria-label="Search current view" /><kbd>⌘ K</kbd></label><div className="notification-wrap"><button className="icon-button" type="button" aria-label="Notifications" aria-expanded={noticeOpen} onClick={() => setNoticeOpen(value => !value)}><Bell size={19} /><i className="notification-dot" /></button>{noticeOpen && <div className="notification-popover"><strong>You're all caught up</strong><p>New order and product updates will show up here.</p></div>}</div><button className="topbar-avatar" type="button" aria-label="Sign out" onClick={onLogout}>N</button></div></header>
}

function PageIntro({ page, onCreate, onExport }) {
  const canCreate = ['Dashboard', 'Orders', 'Products'].includes(page)
  return <div className="page-intro"><div><p className="date-line">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase()}</p><h1>{page === 'Dashboard' ? 'Dashboard overview' : page}</h1><p className="page-subtitle">{page === 'Dashboard' ? 'Here’s what’s happening with your store today.' : `Manage your store ${page.toLowerCase()} and keep everything running smoothly.`}</p></div><div className="intro-actions"><button className="button button-outline" type="button" onClick={onExport}><ArrowDownToLine size={16} /> Export</button>{canCreate && <button className="button button-primary" type="button" onClick={onCreate}><Plus size={17} /> {page === 'Products' ? 'Add product' : 'New order'}</button>}</div></div>
}

function MetricCard({ title, value, change, icon: Icon, tone }) {
  return <article className="metric-card"><div className="metric-card-top"><span>{title}</span><span className={`metric-icon ${tone}`}><Icon size={18} /></span></div><div className="metric-card-bottom"><strong>{value}</strong><span className="metric-change"><ArrowUpRight size={14} />{change}</span></div><p>Compared to last month</p></article>
}

function RevenuePanel({ currency, totalRevenue }) {
  const [period, setPeriod] = useState('Last 6 months')
  const months = period === 'This year' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  return <section className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track how your store is performing over time.</p></div><button className="select-button" type="button" onClick={() => setPeriod(value => value === 'Last 6 months' ? 'This year' : 'Last 6 months')}>{period}<ChevronDown size={15} /></button></div><div className="chart-summary"><strong>{currency}{totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><span><ArrowUpRight size={15} />12.8%</span><small>vs. previous period</small></div><div className="chart-area" role="img" aria-label="Revenue chart trending upward"><div className="chart-y-labels"><span>50k</span><span>35k</span><span>20k</span><span>5k</span></div><svg className="revenue-chart" viewBox="0 0 720 220" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFillSaas" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity=".17" /><stop offset="100%" stopColor="#2563eb" stopOpacity="0" /></linearGradient></defs><path className="chart-gridline" d="M0 24H720 M0 82H720 M0 140H720 M0 198H720" /><path className="chart-fill" d="M0 174 C36 167 52 156 78 163 S121 145 144 150 S183 131 216 141 S260 115 288 125 S330 113 360 118 S402 90 432 103 S473 86 504 92 S547 62 576 77 S616 55 648 61 S692 34 720 38 V220 H0Z" /><path className="chart-line" d="M0 174 C36 167 52 156 78 163 S121 145 144 150 S183 131 216 141 S260 115 288 125 S330 113 360 118 S402 90 432 103 S473 86 504 92 S547 62 576 77 S616 55 648 61 S692 34 720 38" /><circle cx="576" cy="77" r="5" className="chart-point" /></svg><div className="chart-x-labels">{months.map(month => <span key={month}>{month}</span>)}</div></div></section>
}

function RegionPanel() {
  const data = [['North America', 42], ['Europe', 30], ['Asia Pacific', 28]]
  return <section className="panel region-panel"><div className="panel-heading"><div><h2>Top performing region</h2><p>Revenue by customer location.</p></div><MoreHorizontal size={19} className="muted-icon" /></div><div className="region-feature"><div><span className="region-rank">#1 REGION</span><h3>North America</h3></div><strong>$20,282</strong></div><div className="region-list">{data.map(([name, value]) => <div className="region-row" key={name}><div className="region-row-label"><span>{name}</span><strong>{value}%</strong></div><div className="progress-track"><span style={{ width: `${value}%` }} /></div></div>)}</div></section>
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${status.toLowerCase()}`}><i />{status}</span>
}

function OrdersTable({ orders, onStatus, onDelete, currency }) {
  return <div className="table-scroll"><table className="orders-table"><thead><tr><th>ORDER ID</th><th>CUSTOMER</th><th>PRODUCT</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th><th /></tr></thead><tbody>{orders.length ? orders.map(order => <tr key={order.id}><td className="order-id">{order.id}</td><td className="customer-cell"><span className="customer-avatar">{order.customer.split(/\s+/).map(part => part[0]).join('').slice(0, 2)}</span>{order.customer}</td><td>{order.product}</td><td>{order.date}</td><td className="amount-cell">{currency}{Number(order.total).toFixed(2)}</td><td><select className={`status-select ${order.status.toLowerCase()}`} aria-label={`Status for ${order.id}`} value={order.status} onChange={event => onStatus(order.id, event.target.value)}><option>Pending</option><option>Processing</option><option>Completed</option><option>Cancelled</option></select></td><td><button className="row-delete" type="button" aria-label={`Delete ${order.id}`} onClick={() => onDelete(order.id)}><Trash2 size={15} /></button></td></tr>) : <tr><td className="empty-row" colSpan="7">No orders match your search.</td></tr>}</tbody></table></div>
}

function Dashboard({ workspace, search, onOrders, onStatus, onDelete }) {
  const orders = workspace.orders
  const visible = filterRecords(orders, search)
  const revenue = orders.filter(order => order.status !== 'Cancelled').reduce((total, order) => total + Number(order.total), 0)
  const metrics = [
    { title: 'Monthly Revenue', value: `${currencySymbol(workspace.currency)}${revenue.toLocaleString()}`, change: '+12.8%', icon: Wallet, tone: 'blue' },
    { title: 'Pending Orders', value: String(orders.filter(order => ['Pending', 'Processing'].includes(order.status)).length).padStart(2, '0'), change: '+8.2%', icon: ShoppingBag, tone: 'violet' },
    { title: 'Total Customers', value: '1,482', change: '+18.4%', icon: Users, tone: 'green' },
    { title: 'Satisfaction Score', value: '4.8/5', change: '+0.3%', icon: Check, tone: 'orange' },
  ]
  return <><section className="metrics-grid" aria-label="Store metrics">{metrics.map(metric => <MetricCard key={metric.title} {...metric} />)}</section><div className="dashboard-grid"><RevenuePanel currency={currencySymbol(workspace.currency)} totalRevenue={revenue} /><RegionPanel /></div><section className="panel orders-panel"><div className="panel-heading orders-heading"><div><h2>Recent orders</h2><p>You have {orders.length} orders to review.</p></div><button className="text-link" type="button" onClick={onOrders}>View all orders <ArrowRight size={15} /></button></div><OrdersTable orders={visible.slice(0, 5)} onStatus={onStatus} onDelete={onDelete} currency={currencySymbol(workspace.currency)} /></section></>
}

function filterRecords(items, query) {
  const term = query.trim().toLowerCase()
  return term ? items.filter(item => Object.values(item).some(value => String(value).toLowerCase().includes(term))) : items
}

function OrdersPage({ workspace, search, onStatus, onDelete }) {
  const orders = filterRecords(workspace.orders, search)
  return <section className="panel table-panel"><div className="panel-heading"><div><h2>All orders</h2><p>Showing {orders.length} orders in this workspace.</p></div><span className="table-filter-label"><SlidersHorizontal size={15} /> All orders</span></div><OrdersTable orders={orders} onStatus={onStatus} onDelete={onDelete} currency={currencySymbol(workspace.currency)} /></section>
}

function TransactionsTable({ orders, currency }) {
  return <div className="table-scroll"><table className="orders-table"><thead><tr><th>TRANSACTION</th><th>CUSTOMER</th><th>PRODUCT</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{orders.length ? orders.map(order => <tr key={order.id}><td className="order-id">{order.id}</td><td className="customer-cell"><span className="customer-avatar">{order.customer.split(/\s+/).map(part => part[0]).join('').slice(0, 2)}</span>{order.customer}</td><td>{order.product}</td><td>{order.date}</td><td className="amount-cell">{currency}{Number(order.total).toFixed(2)}</td><td><StatusBadge status="Completed" /></td></tr>) : <tr><td className="empty-row" colSpan="6">Completed transactions will appear here.</td></tr>}</tbody></table></div>
}

function ProductsPage({ workspace, search, onDelete }) {
  const products = filterRecords(workspace.products, search)
  return <section className="panel table-panel"><div className="panel-heading"><div><h2>Your products</h2><p>Manage your catalog and keep an eye on inventory.</p></div><span className="table-filter-label">{products.length} products</span></div><div className="table-scroll"><table className="orders-table"><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>INVENTORY</th><th>STATUS</th><th /></tr></thead><tbody>{products.length ? products.map(product => <tr key={product.id}><td className="product-name-cell"><span className="product-placeholder"><Package size={18} /></span><strong>{product.name}</strong></td><td>{product.category}</td><td className="amount-cell">{currencySymbol(workspace.currency)}{Number(product.price).toFixed(2)}</td><td>{product.stock} units</td><td><StatusBadge status={product.stock < 10 ? 'Low stock' : 'In stock'} /></td><td><button className="row-delete" type="button" aria-label={`Delete ${product.name}`} onClick={() => onDelete(product.id)}><Trash2 size={15} /></button></td></tr>) : <tr><td className="empty-row" colSpan="6">No products match your search.</td></tr>}</tbody></table></div></section>
}

function PaymentsPage({ workspace }) {
  const total = workspace.orders.filter(order => order.status === 'Completed').reduce((sum, order) => sum + Number(order.total), 0)
  return <><section className="metrics-grid payment-metrics"><MetricCard title="Available balance" value={`${currencySymbol(workspace.currency)}${(total * .7).toLocaleString()}`} change="+6.2%" icon={Wallet} tone="blue" /><MetricCard title="Next payout" value={`${currencySymbol(workspace.currency)}${(total * .3).toLocaleString()}`} change="May 30" icon={CreditCard} tone="green" /></section><section className="panel table-panel"><div className="panel-heading"><div><h2>Recent transactions</h2><p>Your completed orders and payout activity.</p></div></div><TransactionsTable orders={workspace.orders.filter(order => order.status === 'Completed')} currency={currencySymbol(workspace.currency)} /></section></>
}

function SettingsPage({ workspace, account, onSave }) {
  const [name, setName] = useState(workspace.name)
  const [category, setCategory] = useState(workspace.category)
  const [ownerName, setOwnerName] = useState(account.name)
  const [saved, setSaved] = useState(false)
  function submit(event) {
    event.preventDefault()
    onSave({ name: name.trim(), category, account: { ...account, name: ownerName.trim() } })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }
  return <form className="panel settings-form" onSubmit={submit}><div><h2>Workspace settings</h2><p>Update your workspace details. Your changes are saved in this browser.</p></div><label>Workspace name<input value={name} onChange={event => setName(event.target.value)} required /></label><label>Business type<select value={category} onChange={event => setCategory(event.target.value)}>{['Retail & ecommerce', 'Creative studio', 'Professional services', 'Food & beverage', 'Other'].map(option => <option key={option}>{option}</option>)}</select></label><label>Your name<input value={ownerName} onChange={event => setOwnerName(event.target.value)} required /></label><label>Account email<input value={account.email} readOnly /></label><button className="button button-primary" type="submit">{saved ? <><Check size={16} /> Saved</> : 'Save changes'}</button></form>
}

function AnalyticsPage({ workspace }) {
  const completed = workspace.orders.filter(order => order.status === 'Completed').length
  return <><div className="dashboard-grid analytics-layout"><RevenuePanel currency={currencySymbol(workspace.currency)} totalRevenue={workspace.orders.filter(order => order.status !== 'Cancelled').reduce((total, order) => total + Number(order.total), 0)} /><RegionPanel /></div><section className="panel analytics-note"><span className="metric-icon blue"><Sparkles size={18} /></span><div><h2>Orders fulfilled</h2><p>{completed} completed orders in {workspace.name}. Update order statuses from the Orders page to keep your report current.</p></div></section></>
}

function CreateDialog({ type, onClose, onCreate, currency }) {
  const [name, setName] = useState('')
  const [secondary, setSecondary] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const isProduct = type === 'product'
  function submit(event) {
    event.preventDefault()
    if (!name.trim() || !secondary.trim() || (isProduct && (!price || !stock))) return
    onCreate(isProduct
      ? { name: name.trim(), category: secondary.trim(), price: Number(price), stock: Number(stock) }
      : { customer: name.trim(), product: secondary.trim(), total: Number(price || 0) })
  }
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><form className="dialog-card" onSubmit={submit}><div className="modal-heading"><div><h2>{isProduct ? 'Add a product' : 'Create a new order'}</h2><p>{isProduct ? 'Add a new item to your catalog.' : 'Add an order to your workspace.'}</p></div><button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button></div><label>{isProduct ? 'Product name' : 'Customer name'}<input autoFocus value={name} onChange={event => setName(event.target.value)} placeholder={isProduct ? 'e.g. Everyday Tote' : 'e.g. Alex Morgan'} required /></label><label>{isProduct ? 'Category' : 'Product'}<input value={secondary} onChange={event => setSecondary(event.target.value)} placeholder={isProduct ? 'e.g. Accessories' : 'e.g. Nexora Essentials'} required /></label><div className="dialog-row"><label>{isProduct ? `Price (${currency})` : `Total (${currency})`}<input type="number" min="0" step="0.01" value={price} onChange={event => setPrice(event.target.value)} required={isProduct} placeholder="0.00" /></label>{isProduct && <label>Stock<input type="number" min="0" step="1" value={stock} onChange={event => setStock(event.target.value)} placeholder="0" required /></label>}</div><div className="modal-actions"><button className="button button-outline" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{isProduct ? 'Add product' : 'Create order'}</button></div></form></div>
}

function getLandingRoute() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  return ['features', 'pricing', 'contact'].includes(route) ? route : 'home'
}

function LandingPage({ onStart, onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactNotice, setContactNotice] = useState('')
  const [route, setRoute] = useState(getLandingRoute)

  useEffect(() => {
    function updateRoute() {
      setRoute(getLandingRoute())
    }
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = route === 'home' ? 'Nexora — Your business, in sync' : `${route[0].toUpperCase()}${route.slice(1)} — Nexora`
  }, [route])

  function submitContact(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = `Nexora inquiry from ${form.get('name')}`
    const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`
    setContactNotice('Your email app should open with your message ready to send.')
    window.location.href = `mailto:hello@nexora.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  const features = [
    { icon: Activity, title: 'Real-time analytics', text: 'Understand sales, spot trends, and make your next move with clear, up-to-date reports.' },
    { icon: ShoppingCart, title: 'Order management', text: 'Keep every order organized, from the first click to fulfillment, in one simple view.' },
    { icon: Users, title: 'Customer insights', text: 'See purchase history and customer activity so you can build stronger relationships.' },
    { icon: Package, title: 'Product & inventory', text: 'Track your catalog and stock levels without juggling another spreadsheet.' },
    { icon: CircleDollarSign, title: 'Payments overview', text: 'Get a clearer picture of revenue, payment status, and what your store is earning.' },
    { icon: ShieldCheck, title: 'One calm workspace', text: 'Bring the moving parts of your business together in a secure, focused workspace.' },
  ]

  const plans = [
    { name: 'Starter', price: '$0', description: 'For freelancers and new stores getting organized.', features: ['1 workspace', 'Order and product tracking', 'Essential sales overview'], featured: false },
    { name: 'Growth', price: '$19', description: 'For growing brands ready for a clearer picture.', features: ['Everything in Starter', 'Advanced analytics', 'Customer insights', 'Priority support'], featured: true },
    { name: 'Scale', price: '$49', description: 'For established teams managing more each day.', features: ['Everything in Growth', 'Multiple workspaces', 'Team-ready workflows', 'Dedicated support'], featured: false },
  ]

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="#/" aria-label="Nexora home" onClick={closeMenu}><Brand /></a>
        <button className="landing-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`landing-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#/" aria-current={route === 'home' ? 'page' : undefined} onClick={closeMenu}>Home</a>
          <a href="#/features" aria-current={route === 'features' ? 'page' : undefined} onClick={closeMenu}>Features</a>
          <a href="#/pricing" aria-current={route === 'pricing' ? 'page' : undefined} onClick={closeMenu}>Pricing</a>
          <a href="#/contact" aria-current={route === 'contact' ? 'page' : undefined} onClick={closeMenu}>Contact</a>
          <div className="landing-nav-mobile-actions">
            <button type="button" className="landing-login" onClick={() => { closeMenu(); onLogin() }}>Log in</button>
            <button type="button" className="button button-primary" onClick={() => { closeMenu(); onStart() }}>Start for free <ArrowRight size={15} /></button>
          </div>
        </nav>
        <div className="landing-header-actions">
          <button type="button" className="landing-login" onClick={onLogin}>Log in</button>
          <button type="button" className="button button-primary" onClick={onStart}>Start for free <ArrowRight size={15} /></button>
        </div>
      </header>

      {route === 'home' ? <>
      <section className="landing-hero" id="home">
        <div className="landing-hero-copy">
          <span className="landing-eyebrow"><span /> YOUR BUSINESS, IN SYNC</span>
          <h1>All your store performance.<br /><span>One smart dashboard.</span></h1>
          <p>Track sales, manage orders, and understand your customers—all from one clear, easy-to-use workspace.</p>
          <div className="landing-hero-actions">
            <button type="button" className="button button-primary" onClick={onStart}>Start your free workspace <ArrowRight size={16} /></button>
            <a className="landing-text-link" href="#/features">Explore features <ArrowDownToLine size={15} /></a>
          </div>
          <div className="landing-proof"><span className="landing-avatar-stack"><i>J</i><i>M</i><i>A</i><i>+</i></span><span><strong>Built for the people behind the business.</strong><small>One workspace to keep your next move in view.</small></span></div>
        </div>
        <div className="landing-hero-visual" aria-label="Preview of the Nexora store analytics dashboard">
          <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
          <div className="landing-dashboard">
            <div className="landing-dash-sidebar"><Brand /><span className="dash-side-active"><LayoutDashboard size={14} /> Overview</span><span><ShoppingBag size={14} /> Orders</span><span><Package size={14} /> Products</span><span><BarChart3 size={14} /> Analytics</span><span><Settings size={14} /> Settings</span><div className="dash-side-help"><CircleHelp size={14} /> Help center</div></div>
            <div className="landing-dash-content">
              <div className="landing-dash-top"><div><small>Monday, November 12</small><strong>Good morning, Alex <span>✦</span></strong></div><span className="landing-dash-profile">A</span></div>
              <div className="landing-dash-heading"><div><strong>Store overview</strong><small>Here's what's happening with your store.</small></div><span className="landing-period">Last 30 days <ChevronDown size={12} /></span></div>
              <div className="landing-stat-grid">
                <div className="landing-stat"><small>Total sales</small><strong>$15,490</strong><span>↗ 12.8% <i>vs. last month</i></span></div>
                <div className="landing-stat"><small>Total orders</small><strong>1,248</strong><span>↗ 8.2% <i>vs. last month</i></span></div>
                <div className="landing-stat"><small>Avg. order value</small><strong>$52.40</strong><span>↗ 4.3% <i>vs. last month</i></span></div>
              </div>
              <div className="landing-chart-card"><div className="landing-chart-title"><span><strong>Sales overview</strong><small>Revenue over time</small></span><span className="chart-legend"><i /> Revenue</span></div><div className="landing-chart"><div className="chart-y-labels"><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><svg viewBox="0 0 520 156" preserveAspectRatio="none" role="img" aria-label="Sales trending upward over six months"><defs><linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2b74d4" stopOpacity=".24" /><stop offset="100%" stopColor="#2b74d4" stopOpacity=".01" /></linearGradient></defs><path className="chart-fill" d="M0 126 C28 115 38 93 66 103 S103 126 132 95 S170 60 198 79 S230 114 260 82 S300 72 326 60 S362 78 390 49 S425 58 454 32 S489 42 520 15 V156 H0Z" /><path className="chart-line" d="M0 126 C28 115 38 93 66 103 S103 126 132 95 S170 60 198 79 S230 114 260 82 S300 72 326 60 S362 78 390 49 S425 58 454 32 S489 42 520 15" /></svg></div><div className="landing-chart-months"><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span></div></div>
              <div className="landing-dash-bottom"><span><i className="dash-dot green" /> Store status <strong>Looking good</strong></span><span>Updated just now <ArrowUpRight size={13} /></span></div>
            </div>
          </div>
          <div className="landing-floating-card"><span className="floating-icon"><ArrowUpRight size={16} /></span><span><small>Revenue this month</small><strong>$15,490</strong></span><b>+12.8%</b></div>
          <div className="landing-visual-caption"><span><i /> All your numbers, in one place</span><span>Live overview</span></div>
        </div>
      </section>

      <section className="landing-trust" aria-label="Made for growing businesses">
        <p>MADE FOR PEOPLE BUILDING WHAT'S NEXT</p>
        <div className="landing-trust-logos"><span>Retail</span><span>Creators</span><span>Food &amp; drink</span><span>INDEPENDENT</span><span>Growing teams</span></div>
      </section>

      <section className="landing-benefit">
        <div className="benefit-copy"><span className="landing-eyebrow">LESS BUSYWORK. MORE MOMENTUM.</span><h2>Simple solutions<br />and clear success.</h2><p>Nexora brings your everyday store operations into focus. Spend less time switching tools and more time building a business you love.</p><button className="button button-outline" type="button" onClick={onStart}>Try Nexora for free <ArrowRight size={15} /></button></div>
        <div className="benefit-visual">
          <div className="benefit-window"><div className="benefit-window-head"><Brand /><span>•••</span></div><div className="benefit-metrics"><span><i className="mini-ring ring-blue" />Sales</span><span><i className="mini-ring ring-violet" />Orders</span><span><i className="mini-ring ring-cyan" />Customers</span></div><div className="benefit-wave"><svg viewBox="0 0 460 100" preserveAspectRatio="none" role="img" aria-label="A sample sales trend chart"><path d="M0 76 C33 67 40 36 78 48 S123 75 153 42 S199 25 230 51 S273 61 305 31 S354 41 382 19 S425 31 460 8" /></svg></div><div className="benefit-table"><span>Recent orders</span><span>Everyday Tote <i>Completed</i></span><span>Classic Hoodie <i>Processing</i></span><span>Nexora Essentials <i>Completed</i></span></div></div>
          <div className="benefit-revenue"><small>Total revenue</small><strong>$15,490</strong><span>↗ 12.8% this month</span></div>
          <div className="benefit-sparkle"><Sparkles size={25} /></div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading"><span className="landing-eyebrow">ONE WORKSPACE. EVERY ADVANTAGE.</span><h2>Everything you need to<br />move your business forward.</h2><p>Thoughtful tools for the details that keep your store moving.</p></div>
        <div className="landing-feature-grid">{features.map(({ icon: Icon, title, text }, index) => <article className="landing-feature-card" key={title}><span className={`feature-icon feature-icon-${index + 1}`}><Icon size={20} /></span><h3>{title}</h3><p>{text}</p><a href="#/contact">Learn more <ArrowRight size={14} /></a></article>)}</div>
        <div className="landing-feature-note"><ShieldCheck size={18} /><span><strong>Designed to keep things clear.</strong> Your demo workspace is saved privately in this browser.</span></div>
      </section>

      <section className="landing-testimonials">
        <div className="landing-section-heading"><span className="landing-eyebrow">GOOD WORK, MADE SIMPLER</span><h2>Small business deserves<br />a big-picture view.</h2><p>Practical tools to help you stay focused on what matters.</p></div>
        <div className="landing-quote-grid">
          <article><span className="landing-benefit-icon"><BarChart3 size={18} /></span><h3>Know what's working</h3><p>See your sales and order trends in one simple overview, without hunting through reports.</p></article>
          <article><span className="landing-benefit-icon"><ShoppingBag size={18} /></span><h3>Keep the day moving</h3><p>Bring orders and products together, so the important details are easier to find.</p></article>
          <article><span className="landing-benefit-icon"><Sparkles size={18} /></span><h3>Make room to grow</h3><p>Spend less energy switching tools and more time on your next business idea.</p></article>
        </div>
      </section>

      <section className="landing-pricing" id="pricing">
        <div className="landing-section-heading"><span className="landing-eyebrow">SIMPLE, TRANSPARENT PRICING</span><h2>Choose your pace.<br />Grow on your terms.</h2><p>Start for free. Upgrade when it makes sense for your business.</p><small className="pricing-demo-label">Sample plan pricing for this demo</small></div>
        <div className="landing-pricing-grid">{plans.map(plan => <article className={`landing-plan${plan.featured ? ' landing-plan-featured' : ''}`} key={plan.name}>{plan.featured && <span className="plan-badge">MOST POPULAR</span>}<span className="plan-name">{plan.name}</span><p>{plan.description}</p><div className="plan-price"><strong>{plan.price}</strong><span>/ month</span></div><button type="button" className={`button ${plan.featured ? 'button-primary' : 'button-outline'}`} onClick={onStart}>Choose {plan.name} <ArrowRight size={15} /></button><small className="plan-includes">INCLUDES</small><ul>{plan.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul></article>)}</div>
        <p className="pricing-footnote">Illustrative pricing only. Subscriptions and billing are not connected in this demo.</p>
      </section>

      <section className="landing-contact" id="contact">
        <div className="contact-copy"><span className="landing-eyebrow">WE'RE HERE TO HELP</span><h2>Ready to grow<br />your brand?</h2><p>Have a question or want to learn more? Send us a note and we'll help you find your next step.</p><a href="mailto:hello@nexora.app"><Headphones size={17} /> hello@nexora.app <span className="contact-demo-label">Demo inbox — replace before launch</span></a></div>
        <form className="landing-contact-form" onSubmit={submitContact}>
          <div className="contact-form-heading"><strong>Let's talk</strong><small>Tell us a little about what you need.</small></div>
          <label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
          <label>How can we help?<textarea name="message" rows="3" placeholder="Write your message..." required /></label>
          {contactNotice && <p className="contact-notice" role="status">{contactNotice}</p>}
          <button className="button button-primary" type="submit">Open email to send <ArrowRight size={15} /></button>
          <small className="contact-form-note">This opens your email app; your message is not sent automatically.</small>
        </form>
      </section>
      </> : <MarketingSubpage route={route} features={features} plans={plans} onStart={onStart} contactNotice={contactNotice} submitContact={submitContact} />}

      <footer className="landing-footer">
        <a className="landing-brand" href="#/" aria-label="Nexora home"><Brand /></a>
        <p>A little more clarity for everything you're building.</p>
        <nav aria-label="Footer navigation"><a href="#/features">Features</a><a href="#/pricing">Pricing</a><a href="#/contact">Contact</a><button type="button" onClick={onLogin}>Log in</button></nav>
        <small>© 2026 Nexora. All rights reserved.</small>
      </footer>
    </main>
  )
}

function MarketingSubpage({ route, features, plans, onStart, contactNotice, submitContact }) {
  if (route === 'features') {
    return <>
      <section className="landing-subpage-intro">
        <span className="landing-eyebrow">ONE WORKSPACE. EVERY ADVANTAGE.</span>
        <h1>Tools that keep your<br /><span>business moving.</span></h1>
        <p>Get a clearer view of sales, orders, products, and customers without adding more busywork.</p>
      </section>
      <section className="landing-features">
        <div className="landing-feature-grid">{features.map(({ icon: Icon, title, text }, index) => <article className="landing-feature-card" key={title}><span className={`feature-icon feature-icon-${index + 1}`}><Icon size={20} /></span><h2>{title}</h2><p>{text}</p></article>)}</div>
        <div className="landing-feature-note"><ShieldCheck size={18} /><span><strong>One calm workspace.</strong> Keep your day-to-day store details together and easy to find.</span></div>
      </section>
      <section className="landing-page-cta"><div><span className="landing-eyebrow">READY WHEN YOU ARE</span><h2>Bring your next move into focus.</h2><p>Start exploring with a free demo workspace.</p></div><button type="button" className="button button-primary" onClick={onStart}>Start for free <ArrowRight size={15} /></button></section>
    </>
  }

  if (route === 'pricing') {
    return <>
      <section className="landing-subpage-intro">
        <span className="landing-eyebrow">SIMPLE, TRANSPARENT PRICING</span>
        <h1>Choose your pace.<br /><span>Grow on your terms.</span></h1>
        <p>Start with a free demo, then explore sample plans designed around different stages of business.</p>
      </section>
      <section className="landing-pricing">
        <div className="landing-section-heading"><small className="pricing-demo-label">Sample plan pricing for this demo</small></div>
        <div className="landing-pricing-grid">{plans.map(plan => <article className={`landing-plan${plan.featured ? ' landing-plan-featured' : ''}`} key={plan.name}>{plan.featured && <span className="plan-badge">MOST POPULAR</span>}<span className="plan-name">{plan.name}</span><p>{plan.description}</p><div className="plan-price"><strong>{plan.price}</strong><span>/ month</span></div><button type="button" className={`button ${plan.featured ? 'button-primary' : 'button-outline'}`} onClick={onStart}>Choose {plan.name} <ArrowRight size={15} /></button><small className="plan-includes">INCLUDES</small><ul>{plan.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}</ul></article>)}</div>
        <p className="pricing-footnote">Illustrative pricing only. Subscriptions and billing are not connected in this demo.</p>
      </section>
      <section className="landing-faq"><div className="landing-section-heading"><span className="landing-eyebrow">GOOD TO KNOW</span><h2>Frequently asked questions</h2></div><div className="landing-faq-list"><details><summary>Can I try Nexora for free?</summary><p>Yes. The demo workspace is free to explore and does not ask for payment details.</p></details><details><summary>Are these plans available for purchase?</summary><p>Not yet. The prices and plan features are examples; checkout and subscriptions are not connected.</p></details><details><summary>Where is my demo data stored?</summary><p>Demo accounts and workspace data are saved locally in your browser, not on a server.</p></details></div></section>
    </>
  }

  return <>
    <section className="landing-subpage-intro">
      <span className="landing-eyebrow">WE'RE HERE TO HELP</span>
      <h1>Let's make your<br /><span>next step clearer.</span></h1>
      <p>Questions, feedback, or just want to learn more? Send us a message.</p>
    </section>
    <section className="landing-contact" id="contact">
      <div className="contact-copy"><span className="landing-eyebrow">GET IN TOUCH</span><h2>Tell us what<br />you need.</h2><p>Fill out the form and your email app will open with your message ready to send.</p><a href="mailto:hello@nexora.app"><Headphones size={17} /> hello@nexora.app <span className="contact-demo-label">Demo inbox — replace before launch</span></a></div>
      <form className="landing-contact-form" onSubmit={submitContact}>
        <div className="contact-form-heading"><strong>Send a message</strong><small>We'd love to hear from you.</small></div>
        <label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
        <label>How can we help?<textarea name="message" rows="4" placeholder="Write your message..." required /></label>
        {contactNotice && <p className="contact-notice" role="status">{contactNotice}</p>}
        <button className="button button-primary" type="submit">Open email to send <ArrowRight size={15} /></button>
        <small className="contact-form-note">This opens your email app; your message is not sent automatically.</small>
      </form>
    </section>
    <section className="landing-contact-details"><article><Headphones size={20} /><h2>Email support</h2><p>Use the demo inbox to get in touch. Replace it with your support address before launch.</p><a href="mailto:hello@nexora.app">hello@nexora.app <ArrowRight size={14} /></a></article><article><CircleHelp size={20} /><h2>Need a quick answer?</h2><p>Find plan details and common product questions on our pricing page.</p><a href="#/pricing">Visit pricing <ArrowRight size={14} /></a></article></section>
  </>
}

function App() {
  const [data, setData] = useState(readData)
  const [authMode, setAuthMode] = useState('signup')
  const [stage, setStage] = useState(() => {
    const initial = readData()
    if (initial.workspaces.length && sessionStorage.getItem('nexora.demo-session') === 'active') return 'app'
    return 'landing'
  })
  const [page, setPage] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [toast, setToast] = useState('')
  const active = data.workspaces.find(workspace => workspace.id === data.activeWorkspaceId) || data.workspaces[0]

  useEffect(() => { saveData(data) }, [data])
  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])
  useEffect(() => {
    function handleSearchShortcut(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        document.querySelector('.search-field input')?.focus()
      }
    }
    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [])
  const currency = currencySymbol(active?.currency)

  function setAccount(account) {
    setData(current => ({ ...current, account }))
  }

  function finishOnboarding(details) {
    const workspace = makeWorkspace(details.store.trim(), details.category, details.currency, details.goal)
    setData(current => ({ ...current, workspaces: [...current.workspaces, workspace], activeWorkspaceId: workspace.id }))
    setStage('app')
  }

  function updateWorkspace(id, update) {
    setData(current => ({ ...current, workspaces: current.workspaces.map(workspace => workspace.id === id ? { ...workspace, ...update } : workspace) }))
  }

  function addWorkspace(details) {
    const workspace = makeWorkspace(details.store.trim(), details.category, details.currency, details.goal)
    setData(current => ({ ...current, workspaces: [...current.workspaces, workspace], activeWorkspaceId: workspace.id }))
    setPage('Dashboard')
    setToast('Workspace created')
  }

  function createRecord(record) {
    if (dialog === 'product') {
      const product = { ...record, id: `P-${String(Date.now()).slice(-5)}` }
      updateWorkspace(active.id, { products: [product, ...active.products] })
      setToast('Product added')
    } else {
      const nextId = Math.max(1048, ...active.orders.map(order => Number(order.id.replace(/\D/g, '')) || 0)) + 1
      const order = { ...record, id: `NX-${nextId}`, date: new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date()), status: 'Pending' }
      updateWorkspace(active.id, { orders: [order, ...active.orders] })
      setToast('Order created')
    }
    setDialog(null)
  }

  function updateOrder(id, status) {
    updateWorkspace(active.id, { orders: active.orders.map(order => order.id === id ? { ...order, status } : order) })
  }

  function removeOrder(id) {
    if (!window.confirm(`Delete order ${id}? This cannot be undone.`)) return
    updateWorkspace(active.id, { orders: active.orders.filter(order => order.id !== id) })
    setToast('Order removed')
  }

  function removeProduct(id) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    updateWorkspace(active.id, { products: active.products.filter(product => product.id !== id) })
    setToast('Product removed')
  }

  function exportOrders() {
    const rows = [['Order ID', 'Customer', 'Product', 'Date', 'Amount', 'Status'], ...active.orders.map(order => [order.id, order.customer, order.product, order.date, order.total, order.status])]
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${active.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-orders.csv`
    link.click()
    URL.revokeObjectURL(url)
    setToast('Orders exported')
  }

  function logout() {
    sessionStorage.removeItem('nexora.demo-session')
    setStage('landing')
    setPage('Dashboard')
    setSearch('')
    setDialog(null)
  }

  function content() {
    if (page === 'Dashboard') return <Dashboard workspace={active} search={search} onOrders={() => setPage('Orders')} onStatus={updateOrder} onDelete={removeOrder} />
    if (page === 'Orders') return <OrdersPage workspace={active} search={search} onStatus={updateOrder} onDelete={removeOrder} />
    if (page === 'Products') return <ProductsPage workspace={active} search={search} onDelete={removeProduct} />
    if (page === 'Analytics') return <AnalyticsPage workspace={active} />
    if (page === 'Payments') return <PaymentsPage workspace={active} />
    return <SettingsPage workspace={active} account={data.account} onSave={({ account, ...workspaceUpdate }) => { updateWorkspace(active.id, workspaceUpdate); setData(current => ({ ...current, account })); setToast('Workspace settings saved') }} />
  }

  if (stage === 'landing') return <LandingPage onStart={() => { setAuthMode('signup'); setStage('auth') }} onLogin={() => { setAuthMode('login'); setStage('auth') }} />
  if (stage === 'auth') return <AuthScreen initialMode={authMode} onBack={() => setStage('landing')} existingAccount={data.account} onAccount={setAccount} onComplete={() => { sessionStorage.setItem('nexora.demo-session', 'active'); setStage(data.workspaces.length ? 'app' : 'onboarding') }} />
  if (stage === 'onboarding') return <Onboarding onFinish={finishOnboarding} />

  return <div className="app-shell"><Sidebar page={page} setPage={setPage} workspaces={data.workspaces} active={active} onSelectWorkspace={id => { setData(current => ({ ...current, activeWorkspaceId: id })); setPage('Dashboard'); setSearch('') }} onAddWorkspace={() => setDialog('workspace')} profile={data.account} onLogout={logout} open={mobileNav} onClose={() => setMobileNav(false)} /><main className="main-area"><Header page={page} search={search} setSearch={setSearch} onMenu={() => setMobileNav(true)} onLogout={logout} /><div className="page-content"><PageIntro page={page} onCreate={() => setDialog(page === 'Products' ? 'product' : 'order')} onExport={exportOrders} />{content()}<footer className="page-footer"><span>© 2024 Nexora. All rights reserved.</span><span>Your workspace is saved on this device.</span></footer></div></main>{dialog && (dialog === 'workspace' ? <Onboarding onCancel={() => setDialog(null)} onFinish={details => { addWorkspace(details); setDialog(null) }} /> : <CreateDialog type={dialog} onClose={() => setDialog(null)} onCreate={createRecord} currency={currency} />)}{toast && <div className="toast" role="status"><Check size={16} />{toast}<button type="button" onClick={() => setToast('')} aria-label="Dismiss notification"><X size={15} /></button></div>}</div>
}

createRoot(document.getElementById('root')).render(<App />)
