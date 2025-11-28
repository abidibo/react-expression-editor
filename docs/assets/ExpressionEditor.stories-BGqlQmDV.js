import { r as _, R as S } from './iframe-CYMNTQe-.js'
import { j as d } from './jsx-runtime-D_zvdyIk.js'
import './preload-helper-Dp1pzeXC.js'

import { r as _, R as S } from './iframe-CYMNTQe-.js'
import './preload-helper-Dp1pzeXC.js'
var i = ((t) => (
  (t.VAR = 'variable'),
  (t.NUM = 'number'),
  (t.UNARY_OP = 'unary operator'),
  (t.BINARY_OP = 'binary operator'),
  (t.OPEN_P = 'open parenthesis'),
  (t.CLOSE_P = 'close parenthesis'),
  (t.SPACE = 'space'),
  (t.UNKNOWN = 'unknown'),
  t
))(i || {})
const de = [
    { type: 'space', regex: /^\s+/ },
    { type: 'number', regex: /^(?:\d+(\.\d*)?|\.\d+)/ },
    { type: 'binary operator', regex: /^(==|!=|>=|<=|&&|\|\||>|<)/ },
    { type: 'unary operator', regex: /^!/ },
    { type: 'open parenthesis', regex: /^\(/ },
    { type: 'close parenthesis', regex: /^\)/ },
    { type: 'variable', regex: /^[a-zA-Z_][\w.]*/ },
  ],
  V = (t) => {
    let r = [],
      e = 0
    for (; e < t.length; ) {
      let n = !1
      const o = t.slice(e)
      for (const { type: l, regex: a } of de) {
        const s = o.match(a)
        if (s) {
          const u = s[0]
          ;(r.push({ type: l, value: u, start: e, end: e + u.length }), (e += u.length), (n = !0))
          break
        }
      }
      n || (r.push({ type: 'unknown', value: o[0], start: e, end: e + 1 }), e++)
    }
    return r
  },
  H = (t, r) => {
    const n = V(t).find((o) => r >= o.start && r <= o.end)
    return n || { type: null, value: '', start: r, end: r }
  },
  pe = '_root_1ee3c_1',
  ge = '_editor_1ee3c_5',
  fe = '_validation_1ee3c_14',
  me = '_token_VAR_1ee3c_22',
  he = '_token_NUM_1ee3c_26',
  ve = '_token_BINARY_OP_1ee3c_29',
  _e = '_token_UNARY_OP_1ee3c_32',
  Ne = '_token_UNKNOWN_1ee3c_35',
  xe = '_token_ERROR_1ee3c_39',
  R = {
    root: pe,
    editor: ge,
    validation: fe,
    token_VAR: me,
    token_NUM: he,
    token_BINARY_OP: ve,
    token_UNARY_OP: _e,
    token_UNKNOWN: Ne,
    token_ERROR: xe,
  },
  h = (t, r) => r || t,
  Re = (t) =>
    t.replace(/[&<>"']/g, (r) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[r] || r),
  z = (t, r, e) =>
    t
      .map((o, l) => {
        let a = '',
          s = r.errorTokenIndex === l
        switch (o.type) {
          case i.VAR:
            a = h(R.token_VAR, e == null ? void 0 : e.tokenVar)
            break
          case i.NUM:
            a = h(R.token_NUM, e == null ? void 0 : e.tokenNum)
            break
          case i.BINARY_OP:
            a = h(R.token_BINARY_OP, e == null ? void 0 : e.tokenBinaryOp)
            break
          case i.UNARY_OP:
            a = h(R.token_UNARY_OP, e == null ? void 0 : e.tokenUnaryOp)
            break
          case i.UNKNOWN:
            a = h(R.token_UNKNOWN, e == null ? void 0 : e.tokenUnknown)
            break
          default:
            a = ''
        }
        return `<span title="${Re(r.error ?? '')}" class="${a} ${s ? h(R.token_ERROR, e == null ? void 0 : e.tokenError) : ''}">${o.value}</span>`
      })
      .join(''),
  ke = (t) => {
    let r = 0
    const e = window.getSelection()
    if (e && e.rangeCount > 0) {
      const n = e.getRangeAt(0),
        o = n.cloneRange()
      ;(o.selectNodeContents(t), o.setEnd(n.endContainer, n.endOffset), (r = o.toString().length))
    }
    return r
  },
  Ee = (t, r) => {
    var a, s
    const e = document.createRange(),
      n = window.getSelection()
    let o = 0,
      l = t.firstChild
    for (; l; ) {
      if (l.nodeType === Node.TEXT_NODE) {
        const u = ((a = l.textContent) == null ? void 0 : a.length) || 0
        if (o + u >= r) {
          ;(e.setStart(l, r - o), e.collapse(!0), n == null || n.removeAllRanges(), n == null || n.addRange(e))
          return
        }
        o += u
      } else if (l.childNodes.length > 0) {
        const u = l.firstChild
        if (u) {
          const f = ((s = u.textContent) == null ? void 0 : s.length) || 0
          if (o + f >= r) {
            ;(e.setStart(u, r - o), e.collapse(!0), n == null || n.removeAllRanges(), n == null || n.addRange(e))
            return
          }
          o += f
        }
      }
      l = l.nextSibling
    }
  },
  q = () => {
    const t = window.getSelection()
    if (!t || t.rangeCount === 0) return null
    const e = t.getRangeAt(0).getBoundingClientRect()
    return { top: e.bottom, left: e.left }
  }
var w = ((t) => (
    (t.AND = '&&'),
    (t.OR = '||'),
    (t.NOT = '!'),
    (t.GT = '>'),
    (t.GTE = '>='),
    (t.LT = '<'),
    (t.LTE = '<='),
    (t.EQ = '=='),
    (t.NEQ = '!='),
    t
  ))(w || {}),
  N = ((t) => ((t.EXPECT_OPERAND = 'expect operand'), (t.EXPECT_OPERATOR = 'expect operator'), t))(N || {})
const Ce = {
    manageToken: (t, r) => {
      let e = N.EXPECT_OPERAND,
        n = null
      switch (t.type) {
        case i.UNKNOWN:
          n = `Invalid character: "${t.value}"`
          break
        case i.VAR:
        case i.NUM:
          e = N.EXPECT_OPERATOR
          break
        case i.OPEN_P:
          r++
          break
        case i.UNARY_OP:
          break
        case i.BINARY_OP:
          n = `Unexpected operator "${t.value}" at start of expression`
        case i.CLOSE_P:
          n = 'Unexpected closing parenthesis'
        default:
          n = `Expected value, found "${t.value}"`
      }
      return { state: e, parenDepth: r, error: n }
    },
  },
  Oe = {
    manageToken: (t, r) => {
      let e = N.EXPECT_OPERATOR,
        n = null
      switch (t.type) {
        case i.UNKNOWN:
          n = `Invalid character: "${t.value}"`
          break
        case i.BINARY_OP:
          e = N.EXPECT_OPERAND
          break
        case i.CLOSE_P:
          ;(r--, r < 0 && (n = 'Too many closing parentheses'))
          break
        case i.VAR:
        case i.NUM:
          n = `Expected operator, found "${t.value}"`
        case i.OPEN_P:
          n = 'Implicit multiplication not allowed. Use an operator like && or ||'
        default:
          n = `Expected operator, found "${t.value}"`
      }
      return { state: e, parenDepth: r, error: n }
    },
  },
  B = (t, r, e) => {
    let n = N.EXPECT_OPERAND,
      o = 0,
      l = 0,
      a = null
    for (let s = 0; s < t.length; s++) {
      const u = t[s]
      if (u.type === i.SPACE) {
        l = l + u.value.length
        continue
      }
      if (e && u.type === i.VAR && !r.includes(u.value))
        return {
          isValid: !1,
          error: `Unknown variable "${u.value}"`,
          errorToken: u,
          errorTokenIndex: s,
          errorCharPosition: l,
          state: n,
        }
      switch (n) {
        case N.EXPECT_OPERAND:
          ;({ state: n, parenDepth: o, error: a } = Ce.manageToken(u, o))
          break
        case N.EXPECT_OPERATOR:
          ;({ state: n, parenDepth: o, error: a } = Oe.manageToken(u, o))
          break
      }
      if (a) return { isValid: !1, error: a, errorToken: u, errorTokenIndex: s, errorCharPosition: l }
      l = l + u.value.length
    }
    return o !== 0
      ? { isValid: !1, error: 'Unbalanced parentheses', errorCharPosition: l, state: n }
      : n === N.EXPECT_OPERAND && t.filter((s) => s.type !== i.SPACE).length > 0
        ? { isValid: !1, error: 'Expression cannot end with an operator', errorCharPosition: l, state: n }
        : { isValid: !0, error: null, state: n }
  },
  Pe = (t, r, e, n, o, l, a) => {
    const [s, u] = _.useState([]),
      [f, m] = _.useState(!1),
      [x, E] = _.useState({ top: 0, left: 0 }),
      [C, O] = _.useState(0),
      T = [...r, ...Object.values(w)],
      b = (c, k) => {
        const p = H(c, k)
        if (!p.type) return
        if ([i.VAR, i.BINARY_OP, i.UNKNOWN].includes(p.type) && p.value.trim().length > 0) {
          const P = p.value.toLowerCase(),
            y = T.filter((v) => v.toLowerCase().startsWith(P) && v !== p.value)
          if (
            (y.length < a && y.push(...T.filter((v) => v.toLowerCase().includes(P) && v !== p.value)), y.length > 0)
          ) {
            const v = q()
            if (v) {
              ;(E(v), u([...new Set(y.slice(0, a))]), O(0), m(!0))
              return
            }
          }
        }
        m(!1)
      },
      Y = (c) => {
        const { state: k } = B(V(c), r, !1),
          p = k == N.EXPECT_OPERAND ? [...r, w.NOT] : Object.values(w).filter((g) => g !== w.NOT)
        if (p.length > 0) {
          const g = q()
          if ((g == null ? void 0 : g.left) === 0 && (g == null ? void 0 : g.top) === 0) {
            const P = n.current.getBoundingClientRect()
            ;((g.left = P.left), (g.top = P.top + 26))
          }
          if (g) {
            ;(E(g), u([...new Set(p.slice(0, a))]), O(0), m(!0))
            return
          }
        }
        m(!1)
      },
      I = (c) => {
        var L
        const k = e.current || 0,
          p = H(o, k),
          g = o.slice(0, p.start),
          P = o.slice(p.end),
          y = c === w.NOT ? '' : ' ',
          v = p.type === i.SPACE ? ' ' : '',
          X = g + v + c + y + P
        ;(l(X),
          t(X),
          (e.current = p.start + v.length + c.length + y.length),
          m(!1),
          (L = n.current) == null || L.focus())
      }
    return {
      updateSuggestions: b,
      showMenu: f,
      suggestions: s,
      menuPos: x,
      selectedIndex: C,
      setShowMenu: m,
      setSelectedIndex: O,
      insertSuggestion: I,
      handleKeyDown: (c) => {
        var k
        f
          ? c.key === 'ArrowDown' || c.key === 'Tab'
            ? (c.preventDefault(), O((p) => (p + 1) % s.length))
            : c.key === 'ArrowUp'
              ? (c.preventDefault(), O((p) => (p - 1 + s.length) % s.length))
              : c.key === 'Enter'
                ? (c.preventDefault(), I(s[C]))
                : c.key === 'Escape' && m(!1)
          : c.key === 'Tab' && (c.preventDefault(), Y(((k = n.current) == null ? void 0 : k.innerText) || ''))
      },
    }
  },
  ye = (t, r, e, n) => {
    const o = V(t),
      [l, a] = _.useState(B(o, r, e)),
      [s, u] = _.useState(z(V(t), l, n))
    return {
      html: s,
      validation: l,
      updateHtml: (m) => {
        const x = V(m),
          E = B(x, r, e),
          C = z(x, E, n)
        ;(u(C), a(E))
      },
    }
  },
  Ae = '_menu_zez3e_1',
  we = '_menuItem_zez3e_16',
  Ve = '_menuItemActive_zez3e_23',
  $ = { menu: Ae, menuItem: we, menuItemActive: Ve },
  ce = ({ suggestions: t, menuPos: r, selectedIndex: e, insertSuggestion: n, classes: o }) => {
    const l = _.useRef(null)
    return (
      _.useEffect(() => {
        if (l.current) {
          const a = l.current.children[e]
          a && a.scrollIntoView({ block: 'nearest' })
        }
      }, [e]),
      d.jsx('ul', {
        className: h($.menu, o == null ? void 0 : o.menu),
        ref: l,
        style: { top: r.top, left: r.left },
        children: t.map((a, s) =>
          d.jsx(
            'li',
            {
              onMouseDown: (u) => {
                ;(u.preventDefault(), n(a))
              },
              className: `${h($.menuItem, o == null ? void 0 : o.menuItem)} ${s === e ? h($.menuItemActive, o == null ? void 0 : o.menuItemActive) : ''}`,
              children: a,
            },
            a,
          ),
        ),
      })
    )
  }
ce.__docgenInfo = { description: '', methods: [], displayName: 'AutoCompleteMenu' }
const A = ({
  value: t,
  onChange: r,
  showValidationText: e,
  variables: n = [],
  constraintVariables: o = !1,
  maxSuggestions: l = 10,
  classes: a,
}) => {
  const s = _.useRef(null),
    { html: u, validation: f, updateHtml: m } = ye(t, n, o, a),
    x = _.useRef(0),
    {
      updateSuggestions: E,
      showMenu: C,
      menuPos: O,
      suggestions: T,
      selectedIndex: b,
      handleKeyDown: Y,
      insertSuggestion: I,
    } = Pe(m, n, x, s, t, r, l),
    K = () => {
      if (!s.current) return
      const c = s.current.innerText
      ;((x.current = ke(s.current)), m(c), r(c), E(c, x.current))
    }
  return (
    _.useLayoutEffect(() => {
      s.current && Ee(s.current, x.current)
    }, [u, C, b]),
    d.jsxs('div', {
      className: h(R.root, a == null ? void 0 : a.root),
      children: [
        d.jsx('div', {
          ref: s,
          contentEditable: !0,
          onInput: K,
          onKeyDown: Y,
          suppressContentEditableWarning: !0,
          dangerouslySetInnerHTML: { __html: u },
          className: h(R.editor, a == null ? void 0 : a.editor),
        }),
        C && d.jsx(ce, { suggestions: T, menuPos: O, selectedIndex: b, insertSuggestion: I }),
        e &&
          d.jsx('div', {
            className: h(R.validation, a == null ? void 0 : a.validation),
            children: (f == null ? void 0 : f.error) && `${f.error} at character ${f.errorCharPosition}`,
          }),
      ],
    })
  )
}
A.__docgenInfo = {
  description: '',
  methods: [],
  displayName: 'Editor',
  props: {
    variables: { defaultValue: { value: '[]', computed: !1 }, required: !1 },
    constraintVariables: { defaultValue: { value: 'false', computed: !1 }, required: !1 },
    maxSuggestions: { defaultValue: { value: '10', computed: !1 }, required: !1 },
  },
}
const Ie = {
    title: 'Expression Editor',
    component: A,
    decorators: [
      (t, r) =>
        d.jsxs('div', {
          style: { maxWidth: '1000px' },
          children: [d.jsx('h2', { children: 'react-expression-editor' }), d.jsx(t, {})],
        }),
    ],
    args: {
      variables: ['engine.transmission.speed', 'temperature', 'var1'],
      constraintVariables: !0,
      showValidationText: !0,
    },
    parameters: { layout: 'centered' },
  },
  U = {
    render: function (r) {
      const [e, n] = S.useState('')
      return (
        console.log('Current value', e),
        d.jsx('div', {
          style: { maxWidth: '100%', width: '600px' },
          children: d.jsx(A, { ...r, value: e, onChange: n }),
        })
      )
    },
    args: {},
  },
  j = {
    render: function (r) {
      const [e, n] = S.useState('')
      return (
        console.log('Current value', e),
        d.jsx('div', {
          style: { maxWidth: '100%', width: '600px' },
          children: d.jsx(A, { ...r, value: e, onChange: n }),
        })
      )
    },
    args: { constraintVariables: !1 },
  },
  W = {
    render: function (r) {
      const [e, n] = S.useState('')
      return (
        console.log('Current value', e),
        d.jsx('div', {
          style: { maxWidth: '100%', width: '600px' },
          children: d.jsx(A, { ...r, value: e, onChange: n }),
        })
      )
    },
    args: { showValidationText: !1 },
  },
  D = {
    render: function (r) {
      const [e, n] = S.useState('(engine.transmission.speed > 100) || !temperature')
      return (
        console.log('Current value', e),
        d.jsx('div', {
          style: { maxWidth: '100%', width: '600px' },
          children: d.jsx(A, { ...r, value: e, onChange: n }),
        })
      )
    },
    args: { showValidationText: !1 },
  },
  M = {
    render: function (r) {
      const [e, n] = S.useState('(engine.transmission.speed > 100) || !temperature')
      return (
        console.log('Current value', e),
        d.jsxs('div', {
          style: { maxWidth: '100%', width: '600px' },
          children: [
            d.jsx('style', {
              children: `
      .c-root {
        background-color: #222;
        color: #fff;
      }
      .token-var {
        color: #fff;
      }

      .token-binary-op {
        color: green;
      }

      .token-num {
        color: yellow;
      }
    `,
            }),
            d.jsx(A, { ...r, value: e, onChange: n }),
          ],
        })
      )
    },
    args: {
      classes: { root: 'c-root', tokenVar: 'token-var', tokenBinaryOp: 'token-binary-op', tokenNum: 'token-num' },
    },
  }
var G, Q, F
U.parameters = {
  ...U.parameters,
  docs: {
    ...((G = U.parameters) == null ? void 0 : G.docs),
    source: {
      originalSource: `{
  render: function Render(args) {
    const [value, setValue] = React.useState('');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {}
}`,
      ...((F = (Q = U.parameters) == null ? void 0 : Q.docs) == null ? void 0 : F.source),
    },
  },
}
var Z, J, ee
j.parameters = {
  ...j.parameters,
  docs: {
    ...((Z = j.parameters) == null ? void 0 : Z.docs),
    source: {
      originalSource: `{
  render: function Render(args) {
    const [value, setValue] = React.useState('');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    constraintVariables: false
  }
}`,
      ...((ee = (J = j.parameters) == null ? void 0 : J.docs) == null ? void 0 : ee.source),
    },
  },
}
var te, ne, re
W.parameters = {
  ...W.parameters,
  docs: {
    ...((te = W.parameters) == null ? void 0 : te.docs),
    source: {
      originalSource: `{
  render: function Render(args) {
    const [value, setValue] = React.useState('');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    showValidationText: false
  }
}`,
      ...((re = (ne = W.parameters) == null ? void 0 : ne.docs) == null ? void 0 : re.source),
    },
  },
}
var oe, ae, se
D.parameters = {
  ...D.parameters,
  docs: {
    ...((oe = D.parameters) == null ? void 0 : oe.docs),
    source: {
      originalSource: `{
  render: function Render(args) {
    const [value, setValue] = React.useState('(engine.transmission.speed > 100) || !temperature');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    showValidationText: false
  }
}`,
      ...((se = (ae = D.parameters) == null ? void 0 : ae.docs) == null ? void 0 : se.source),
    },
  },
}
var le, ue, ie
M.parameters = {
  ...M.parameters,
  docs: {
    ...((le = M.parameters) == null ? void 0 : le.docs),
    source: {
      originalSource: `{
  render: function Render(args) {
    const [value, setValue] = React.useState('(engine.transmission.speed > 100) || !temperature');
    console.log('Current value', value);
    const css = \`
      .c-root {
        background-color: #222;
        color: #fff;
      }
      .token-var {
        color: #fff;
      }

      .token-binary-op {
        color: green;
      }

      .token-value {
        color: yellow;
      }
    \`;
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <style>{css}</style>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    classes: {
      root: 'c-root',
      tokenVar: 'token-var',
      tokenBinaryOp: 'token-binary-op',
      tokenValue: 'token-value'
    }
  }
}`,
      ...((ie = (ue = M.parameters) == null ? void 0 : ue.docs) == null ? void 0 : ie.source),
    },
  },
}
const Ue = ['Default', 'NoVariableConstraint', 'NoValidationMessage', 'InitialValue', 'CustomClasses']
export {
  M as CustomClasses,
  U as Default,
  D as InitialValue,
  W as NoValidationMessage,
  j as NoVariableConstraint,
  Ue as __namedExportsOrder,
  Ie as default,
}
