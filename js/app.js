(() => {
  "use strict";
  const e = {};
  let t = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    s = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    i = (e, i = 500) => (e.hidden ? s(e, i) : t(e, i)),
    a = !0,
    l = (e = 500) => {
      let t = document.querySelector("body");
      if (a) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, e);
      }
    },
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (a) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (a = !1),
          setTimeout(function () {
            a = !0;
          }, e);
      }
    };
  function r(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          a = s.dataset[t].split(",");
        (i.value = a[0]),
          (i.type = a[1] ? a[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      })(i);
      const a = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              l = s[2],
              n = window.matchMedia(s[0]),
              r = e.filter(function (e) {
                if (e.value === i && e.type === l) return !0;
              });
            a.push({ itemsArray: r, matchMedia: n });
          }),
          a
        );
    }
  }
  let o = {
    getErrors(e) {
      let t = 0,
        s = e.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(t) {
      t.reset(),
        setTimeout(() => {
          let s = t.querySelectorAll("input,textarea");
          for (let e = 0; e < s.length; e++) {
            const t = s[e];
            t.parentElement.classList.remove("_form-focus"),
              t.classList.remove("_form-focus"),
              o.removeError(t);
          }
          let i = t.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (e.select) {
            let s = t.querySelectorAll(".select");
            if (s.length)
              for (let t = 0; t < s.length; t++) {
                const i = s[t].querySelector("select");
                e.select.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function c(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function d(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
      void 0 === e[s]
        ? (e[s] = t[s])
        : c(t[s]) && c(e[s]) && Object.keys(t[s]).length > 0 && d(e[s], t[s]);
    });
  }
  e.select = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        (this.selectClasses = {
          classSelect: "select",
          classSelectBody: "select__body",
          classSelectTitle: "select__title",
          classSelectValue: "select__value",
          classSelectLabel: "select__label",
          classSelectInput: "select__input",
          classSelectText: "select__text",
          classSelectLink: "select__link",
          classSelectOptions: "select__options",
          classSelectOptionsScroll: "select__scroll",
          classSelectOption: "select__option",
          classSelectContent: "select__content",
          classSelectRow: "select__row",
          classSelectData: "select__asset",
          classSelectDisabled: "_select-disabled",
          classSelectTag: "_select-tag",
          classSelectOpen: "_select-open",
          classSelectActive: "_select-active",
          classSelectFocus: "_select-focus",
          classSelectMultiple: "_select-multiple",
          classSelectCheckBox: "_select-checkbox",
          classSelectOptionSelected: "_select-selected",
        }),
        (this._this = this),
        this.config.init)
      ) {
        const e = t
          ? document.querySelectorAll(t)
          : document.querySelectorAll("select");
        e.length
          ? (this.selectsInit(e),
            this.setLogging(`Проснулся, построил селектов: (${e.length})`))
          : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(e) {
      return `.${e}`;
    }
    getSelectElement(e, t) {
      return {
        originalSelect: e.querySelector("select"),
        selectElement: e.querySelector(this.getSelectClass(t)),
      };
    }
    selectsInit(e) {
      e.forEach((e, t) => {
        this.selectInit(e, t + 1);
      }),
        document.addEventListener(
          "click",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "keydown",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusin",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        ),
        document.addEventListener(
          "focusout",
          function (e) {
            this.selectsActions(e);
          }.bind(this)
        );
    }
    selectInit(e, t) {
      const s = this;
      let i = document.createElement("div");
      if (
        (i.classList.add(this.selectClasses.classSelect),
        e.parentNode.insertBefore(i, e),
        i.appendChild(e),
        (e.hidden = !0),
        t && (e.dataset.id = t),
        i.insertAdjacentHTML(
          "beforeend",
          `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
        ),
        this.selectBuild(e),
        this.getSelectPlaceholder(e) &&
          ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
          this.getSelectPlaceholder(e).label.show))
      ) {
        this.getSelectElement(
          i,
          this.selectClasses.classSelectTitle
        ).selectElement.insertAdjacentHTML(
          "afterbegin",
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(e).label.text
              ? this.getSelectPlaceholder(e).label.text
              : this.getSelectPlaceholder(e).value
          }</span>`
        );
      }
      (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
        e.addEventListener("change", function (e) {
          s.selectChange(e);
        });
    }
    selectBuild(e) {
      const t = e.parentElement;
      (t.dataset.id = e.dataset.id),
        t.classList.add(
          e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""
        ),
        e.multiple
          ? t.classList.add(this.selectClasses.classSelectMultiple)
          : t.classList.remove(this.selectClasses.classSelectMultiple),
        e.hasAttribute("data-checkbox") && e.multiple
          ? t.classList.add(this.selectClasses.classSelectCheckBox)
          : t.classList.remove(this.selectClasses.classSelectCheckBox),
        this.setSelectTitleValue(t, e),
        this.setOptions(t, e),
        e.hasAttribute("data-search") && this.searchActions(t),
        e.hasAttribute("data-open") && this.selectAction(t),
        this.selectDisabled(t, e);
    }
    selectsActions(e) {
      const t = e.target,
        s = e.type;
      if (
        t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
        t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
        const i = t.closest(".select")
            ? t.closest(".select")
            : document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  ).dataset.selectId
                }"]`
              ),
          a = this.getSelectElement(i).originalSelect;
        if ("click" === s) {
          if (!a.disabled)
            if (
              t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
            ) {
              const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ),
                s = document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`
                );
              this.optionAction(i, a, s);
            } else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            )
              this.selectAction(i);
            else if (
              t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              const e = t.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              this.optionAction(i, a, e);
            }
        } else
          "focusin" === s || "focusout" === s
            ? t.closest(this.getSelectClass(this.selectClasses.classSelect)) &&
              ("focusin" === s
                ? i.classList.add(this.selectClasses.classSelectFocus)
                : i.classList.remove(this.selectClasses.classSelectFocus))
            : "keydown" === s && "Escape" === e.code && this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose() {
      const e = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      e.length &&
        e.forEach((e) => {
          this.selectAction(e);
        });
    }
    selectAction(e) {
      const t = this.getSelectElement(e).originalSelect,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement;
      s.classList.contains("_slide") ||
        (e.classList.toggle(this.selectClasses.classSelectOpen),
        i(s, t.dataset.speed));
    }
    setSelectTitleValue(e, t) {
      const s = this.getSelectElement(
          e,
          this.selectClasses.classSelectBody
        ).selectElement,
        i = this.getSelectElement(
          e,
          this.selectClasses.classSelectTitle
        ).selectElement;
      i && i.remove(),
        s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
    }
    getSelectTitleValue(e, t) {
      let s = this.getSelectedOptionsData(t, 2).html;
      if (
        (t.multiple &&
          t.hasAttribute("data-tags") &&
          ((s = this.getSelectedOptionsData(t)
            .elements.map(
              (t) =>
                `<span role="button" data-select-id="${
                  e.dataset.id
                }" data-value="${
                  t.value
                }" class="_select-tag">${this.getSelectElementContent(
                  t
                )}</span>`
            )
            .join("")),
          t.dataset.tags &&
            document.querySelector(t.dataset.tags) &&
            ((document.querySelector(t.dataset.tags).innerHTML = s),
            t.hasAttribute("data-search") && (s = !1))),
        (s = s.length ? s : t.dataset.placeholder),
        this.getSelectedOptionsData(t).values.length
          ? e.classList.add(this.selectClasses.classSelectActive)
          : e.classList.remove(this.selectClasses.classSelectActive),
        t.hasAttribute("data-search"))
      )
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      {
        const e =
          this.getSelectedOptionsData(t).elements.length &&
          this.getSelectedOptionsData(t).elements[0].dataset.class
            ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
      }
    }
    getSelectElementContent(e) {
      const t = e.dataset.asset ? `${e.dataset.asset}` : "",
        s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
      let i = "";
      return (
        (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectData}">` : ""),
        (i += t ? s : ""),
        (i += t ? "</span>" : ""),
        (i += t ? `<span class="${this.selectClasses.classSelectText}">` : ""),
        (i += e.textContent),
        (i += t ? "</span>" : ""),
        (i += t ? "</span>" : ""),
        i
      );
    }
    getSelectPlaceholder(e) {
      const t = Array.from(e.options).find((e) => !e.value);
      if (t)
        return {
          value: t.textContent,
          show: t.hasAttribute("data-show"),
          label: { show: t.hasAttribute("data-label"), text: t.dataset.label },
        };
    }
    getSelectedOptionsData(e, t) {
      let s = [];
      return (
        e.multiple
          ? (s = Array.from(e.options)
              .filter((e) => e.value)
              .filter((e) => e.selected))
          : s.push(e.options[e.selectedIndex]),
        {
          elements: s.map((e) => e),
          values: s.filter((e) => e.value).map((e) => e.value),
          html: s.map((e) => this.getSelectElementContent(e)),
        }
      );
    }
    getOptions(e) {
      let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
        s = e.dataset.scroll ? `style="max-height:${e.dataset.scroll}px"` : "",
        i = Array.from(e.options);
      if (i.length > 0) {
        let a = "";
        return (
          ((this.getSelectPlaceholder(e) &&
            !this.getSelectPlaceholder(e).show) ||
            e.multiple) &&
            (i = i.filter((e) => e.value)),
          (a += t
            ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
            : ""),
          i.forEach((t) => {
            a += this.getOption(t, e);
          }),
          (a += t ? "</div>" : ""),
          a
        );
      }
    }
    getOption(e, t) {
      const s =
          e.selected && t.multiple
            ? ` ${this.selectClasses.classSelectOptionSelected}`
            : "",
        i = e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
        a = e.dataset.class ? ` ${e.dataset.class}` : "",
        l = !!e.dataset.href && e.dataset.href,
        n = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
      let r = "";
      return (
        (r += l
          ? `<a ${n} ${i} href="${l}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${a}${s}">`
          : `<button ${i} class="${this.selectClasses.classSelectOption}${a}${s}" data-value="${e.value}" type="button">`),
        (r += this.getSelectElementContent(e)),
        (r += l ? "</a>" : "</button>"),
        r
      );
    }
    setOptions(e, t) {
      this.getSelectElement(
        e,
        this.selectClasses.classSelectOptions
      ).selectElement.innerHTML = this.getOptions(t);
    }
    optionAction(e, t, s) {
      if (t.multiple) {
        s.classList.toggle(this.selectClasses.classSelectOptionSelected);
        this.getSelectedOptionsData(t).elements.forEach((e) => {
          e.removeAttribute("selected");
        });
        e.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        ).forEach((e) => {
          t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
            "selected",
            "selected"
          );
        });
      } else
        t.hasAttribute("data-show-selected") ||
          (e.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption
            )}[hidden]`
          ) &&
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = !1),
          (s.hidden = !0)),
          (t.value = s.hasAttribute("data-value")
            ? s.dataset.value
            : s.textContent),
          this.selectAction(e);
      this.setSelectTitleValue(e, t), this.setSelectChange(t);
    }
    selectChange(e) {
      const t = e.target;
      this.selectBuild(t), this.setSelectChange(t);
    }
    setSelectChange(e) {
      if (
        (e.hasAttribute("data-validate") && o.validateInput(e),
        e.hasAttribute("data-submit") && e.value)
      ) {
        let t = document.createElement("button");
        (t.type = "submit"), e.closest("form").append(t), t.click(), t.remove();
      }
      const t = e.parentElement;
      this.selectCallback(t, e);
    }
    selectDisabled(e, t) {
      t.disabled
        ? (e.classList.add(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !0))
        : (e.classList.remove(this.selectClasses.classSelectDisabled),
          (this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement.disabled = !1));
    }
    searchActions(e) {
      this.getSelectElement(e).originalSelect;
      const t = this.getSelectElement(
          e,
          this.selectClasses.classSelectInput
        ).selectElement,
        s = this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement,
        i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
        a = this;
      t.addEventListener("input", function () {
        i.forEach((e) => {
          e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
            ? (e.hidden = !1)
            : (e.hidden = !0);
        }),
          !0 === s.hidden && a.selectAction(e);
      });
    }
    selectCallback(e, t) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", { detail: { select: t } })
      );
    }
    setLogging(e) {
      this.config.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[select]: ${e}`);
    }
  })({});
  const p = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function u() {
    const e = "undefined" != typeof document ? document : {};
    return d(e, p), e;
  }
  const h = {
    document: p,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function m() {
    const e = "undefined" != typeof window ? window : {};
    return d(e, h), e;
  }
  class f extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function g(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...g(e)) : t.push(e);
      }),
      t
    );
  }
  function v(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function b(e, t) {
    const s = m(),
      i = u();
    let a = [];
    if (!t && e instanceof f) return e;
    if (!e) return new f(a);
    if ("string" == typeof e) {
      const s = e.trim();
      if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
        let e = "div";
        0 === s.indexOf("<li") && (e = "ul"),
          0 === s.indexOf("<tr") && (e = "tbody"),
          (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
          0 === s.indexOf("<tbody") && (e = "table"),
          0 === s.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = s;
        for (let e = 0; e < t.childNodes.length; e += 1)
          a.push(t.childNodes[e]);
      } else
        a = (function (e, t) {
          if ("string" != typeof e) return [e];
          const s = [],
            i = t.querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) s.push(i[e]);
          return s;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === s || e === i) a.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof f) return e;
      a = e;
    }
    return new f(
      (function (e) {
        const t = [];
        for (let s = 0; s < e.length; s += 1)
          -1 === t.indexOf(e[s]) && t.push(e[s]);
        return t;
      })(a)
    );
  }
  b.fn = f.prototype;
  const S = "resize scroll".split(" ");
  function w(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          S.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : b(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  w("click"),
    w("blur"),
    w("focus"),
    w("focusin"),
    w("focusout"),
    w("keyup"),
    w("keydown"),
    w("keypress"),
    w("submit"),
    w("change"),
    w("mousedown"),
    w("mousemove"),
    w("mouseup"),
    w("mouseenter"),
    w("mouseleave"),
    w("mouseout"),
    w("mouseover"),
    w("touchstart"),
    w("touchend"),
    w("touchmove"),
    w("resize"),
    w("scroll");
  const y = {
    addClass: function (...e) {
      const t = g(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = g(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = g(e.map((e) => e.split(" ")));
      return (
        v(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = g(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else
          for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, s, i, a] = e;
      function l(e) {
        const t = e.target;
        if (!t) return;
        const a = e.target.dom7EventData || [];
        if ((a.indexOf(e) < 0 && a.unshift(e), b(t).is(s))) i.apply(t, a);
        else {
          const e = b(t).parents();
          for (let t = 0; t < e.length; t += 1)
            b(e[t]).is(s) && i.apply(e[t], a);
        }
      }
      function n(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
      }
      "function" == typeof e[1] && (([t, i, a] = e), (s = void 0)),
        a || (a = !1);
      const r = t.split(" ");
      let o;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
          for (o = 0; o < r.length; o += 1) {
            const e = r[o];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: i, proxyListener: l }),
              t.addEventListener(e, l, a);
          }
        else
          for (o = 0; o < r.length; o += 1) {
            const e = r[o];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: i, proxyListener: n }),
              t.addEventListener(e, n, a);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, s, i, a] = e;
      "function" == typeof e[1] && (([t, i, a] = e), (s = void 0)),
        a || (a = !1);
      const l = t.split(" ");
      for (let e = 0; e < l.length; e += 1) {
        const t = l[e];
        for (let e = 0; e < this.length; e += 1) {
          const l = this[e];
          let n;
          if (
            (!s && l.dom7Listeners
              ? (n = l.dom7Listeners[t])
              : s && l.dom7LiveListeners && (n = l.dom7LiveListeners[t]),
            n && n.length)
          )
            for (let e = n.length - 1; e >= 0; e -= 1) {
              const s = n[e];
              (i && s.listener === i) ||
              (i &&
                s.listener &&
                s.listener.dom7proxy &&
                s.listener.dom7proxy === i)
                ? (l.removeEventListener(t, s.proxyListener, a), n.splice(e, 1))
                : i ||
                  (l.removeEventListener(t, s.proxyListener, a),
                  n.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = m(),
        s = e[0].split(" "),
        i = e[1];
      for (let a = 0; a < s.length; a += 1) {
        const l = s[a];
        for (let s = 0; s < this.length; s += 1) {
          const a = this[s];
          if (t.CustomEvent) {
            const s = new t.CustomEvent(l, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
            (a.dom7EventData = e.filter((e, t) => t > 0)),
              a.dispatchEvent(s),
              (a.dom7EventData = []),
              delete a.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function s(i) {
            i.target === this && (e.call(this, i), t.off("transitionend", s));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = m();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = m(),
          t = u(),
          s = this[0],
          i = s.getBoundingClientRect(),
          a = t.body,
          l = s.clientTop || a.clientTop || 0,
          n = s.clientLeft || a.clientLeft || 0,
          r = s === e ? e.scrollY : s.scrollTop,
          o = s === e ? e.scrollX : s.scrollLeft;
        return { top: i.top + r - l, left: i.left + o - n };
      }
      return null;
    },
    css: function (e, t) {
      const s = m();
      let i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (const t in e) this[i].style[t] = e[t];
          return this;
        }
        if (this[0])
          return s.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, s) => {
            e.apply(t, [t, s]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = m(),
        s = u(),
        i = this[0];
      let a, l;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (a = b(e), l = 0; l < a.length; l += 1) if (a[l] === i) return !0;
        return !1;
      }
      if (e === s) return i === s;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof f) {
        for (a = e.nodeType ? [e] : e, l = 0; l < a.length; l += 1)
          if (a[l] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return b([]);
      if (e < 0) {
        const s = t + e;
        return b(s < 0 ? [] : [this[s]]);
      }
      return b([this[e]]);
    },
    append: function (...e) {
      let t;
      const s = u();
      for (let i = 0; i < e.length; i += 1) {
        t = e[i];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const i = s.createElement("div");
            for (i.innerHTML = t; i.firstChild; )
              this[e].appendChild(i.firstChild);
          } else if (t instanceof f)
            for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = u();
      let s, i;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
          const a = t.createElement("div");
          for (a.innerHTML = e, i = a.childNodes.length - 1; i >= 0; i -= 1)
            this[s].insertBefore(a.childNodes[i], this[s].childNodes[0]);
        } else if (e instanceof f)
          for (i = 0; i < e.length; i += 1)
            this[s].insertBefore(e[i], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && b(this[0].nextElementSibling).is(e)
            ? b([this[0].nextElementSibling])
            : b([])
          : this[0].nextElementSibling
          ? b([this[0].nextElementSibling])
          : b([])
        : b([]);
    },
    nextAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return b([]);
      for (; s.nextElementSibling; ) {
        const i = s.nextElementSibling;
        e ? b(i).is(e) && t.push(i) : t.push(i), (s = i);
      }
      return b(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && b(t.previousElementSibling).is(e)
            ? b([t.previousElementSibling])
            : b([])
          : t.previousElementSibling
          ? b([t.previousElementSibling])
          : b([]);
      }
      return b([]);
    },
    prevAll: function (e) {
      const t = [];
      let s = this[0];
      if (!s) return b([]);
      for (; s.previousElementSibling; ) {
        const i = s.previousElementSibling;
        e ? b(i).is(e) && t.push(i) : t.push(i), (s = i);
      }
      return b(t);
    },
    parent: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
          (e
            ? b(this[s].parentNode).is(e) && t.push(this[s].parentNode)
            : t.push(this[s].parentNode));
      return b(t);
    },
    parents: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        let i = this[s].parentNode;
        for (; i; ) e ? b(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      }
      return b(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? b([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const i = this[s].querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
      }
      return b(t);
    },
    children: function (e) {
      const t = [];
      for (let s = 0; s < this.length; s += 1) {
        const i = this[s].children;
        for (let s = 0; s < i.length; s += 1)
          (e && !b(i[s]).is(e)) || t.push(i[s]);
      }
      return b(t);
    },
    filter: function (e) {
      return b(v(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(y).forEach((e) => {
    Object.defineProperty(b.fn, e, { value: y[e], writable: !0 });
  });
  const C = b;
  function T(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function E() {
    return Date.now();
  }
  function x(e, t) {
    void 0 === t && (t = "x");
    const s = m();
    let i, a, l;
    const n = (function (e) {
      const t = m();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((a = n.transform || n.webkitTransform),
          a.split(",").length > 6 &&
            (a = a
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (l = new s.WebKitCSSMatrix("none" === a ? "" : a)))
        : ((l =
            n.MozTransform ||
            n.OTransform ||
            n.MsTransform ||
            n.msTransform ||
            n.transform ||
            n
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = l.toString().split(","))),
      "x" === t &&
        (a = s.WebKitCSSMatrix
          ? l.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (a = s.WebKitCSSMatrix
          ? l.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      a || 0
    );
  }
  function $(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function L(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function A() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
      const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
      if (null != i && !L(i)) {
        const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, a = s.length; t < a; t += 1) {
          const a = s[t],
            l = Object.getOwnPropertyDescriptor(i, a);
          void 0 !== l &&
            l.enumerable &&
            ($(e[a]) && $(i[a])
              ? i[a].__swiper__
                ? (e[a] = i[a])
                : A(e[a], i[a])
              : !$(e[a]) && $(i[a])
              ? ((e[a] = {}), i[a].__swiper__ ? (e[a] = i[a]) : A(e[a], i[a]))
              : (e[a] = i[a]));
        }
      }
    }
    return e;
  }
  function M(e, t, s) {
    e.style.setProperty(t, s);
  }
  function k(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const a = m(),
      l = -t.translate;
    let n,
      r = null;
    const o = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > l ? "next" : "prev",
      d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      p = () => {
        (n = new Date().getTime()), null === r && (r = n);
        const e = Math.max(Math.min((n - r) / o, 1), 0),
          c = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = l + c * (s - l);
        if ((d(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), d(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void a.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = a.requestAnimationFrame(p);
      };
    p();
  }
  let P, _, O;
  function z() {
    return (
      P ||
        (P = (function () {
          const e = m(),
            t = u();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const s = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, s);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      P
    );
  }
  function I(e) {
    return (
      void 0 === e && (e = {}),
      _ ||
        (_ = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = z(),
            i = m(),
            a = i.navigator.platform,
            l = t || i.navigator.userAgent,
            n = { ios: !1, android: !1 },
            r = i.screen.width,
            o = i.screen.height,
            c = l.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = l.match(/(iPad).*OS\s([\d_]+)/);
          const p = l.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !d && l.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === a;
          let f = "MacIntel" === a;
          return (
            !d &&
              f &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${r}x${o}`) >= 0 &&
              ((d = l.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (f = !1)),
            c && !h && ((n.os = "android"), (n.android = !0)),
            (d || u || p) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      _
    );
  }
  function D() {
    return (
      O ||
        (O = (function () {
          const e = m();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      O
    );
  }
  const B = {
    on(e, t, s) {
      const i = this;
      if ("function" != typeof t) return i;
      const a = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][a](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if ("function" != typeof t) return i;
      function a() {
        i.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
        for (var s = arguments.length, l = new Array(s), n = 0; n < s; n++)
          l[n] = arguments[n];
        t.apply(i, l);
      }
      return (a.__emitterProxy = t), i.on(e, a, s);
    },
    onAny(e, t) {
      const s = this;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, a) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(a, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var a = arguments.length, l = new Array(a), n = 0; n < a; n++)
        l[n] = arguments[n];
      "string" == typeof l[0] || Array.isArray(l[0])
        ? ((t = l[0]), (s = l.slice(1, l.length)), (i = e))
        : ((t = l[0].events), (s = l[0].data), (i = l[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const q = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i[0].clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(i.css("padding-left") || 0, 10) -
            parseInt(i.css("padding-right") || 0, 10)),
          (s =
            s -
            parseInt(i.css("padding-top") || 0, 10) -
            parseInt(i.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        { $wrapperEl: a, size: l, rtlTranslate: n, wrongRTL: r } = e,
        o = e.virtual && i.virtual.enabled,
        c = o ? e.virtual.slides.length : e.slides.length,
        d = a.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : d.length;
      let u = [];
      const h = [],
        m = [];
      let f = i.slidesOffsetBefore;
      "function" == typeof f && (f = i.slidesOffsetBefore.call(e));
      let g = i.slidesOffsetAfter;
      "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let S = i.spaceBetween,
        w = -f,
        y = 0,
        C = 0;
      if (void 0 === l) return;
      "string" == typeof S &&
        S.indexOf("%") >= 0 &&
        (S = (parseFloat(S.replace("%", "")) / 100) * l),
        (e.virtualSize = -S),
        n
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        i.centeredSlides &&
          i.cssMode &&
          (M(e.wrapperEl, "--swiper-centered-offset-before", ""),
          M(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const T = i.grid && i.grid.rows > 1 && e.grid;
      let E;
      T && e.grid.initSlides(p);
      const x =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let a = 0; a < p; a += 1) {
        E = 0;
        const n = d.eq(a);
        if (
          (T && e.grid.updateSlide(a, n, p, t), "none" !== n.css("display"))
        ) {
          if ("auto" === i.slidesPerView) {
            x && (d[a].style[t("width")] = "");
            const l = getComputedStyle(n[0]),
              r = n[0].style.transform,
              o = n[0].style.webkitTransform;
            if (
              (r && (n[0].style.transform = "none"),
              o && (n[0].style.webkitTransform = "none"),
              i.roundLengths)
            )
              E = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
            else {
              const e = s(l, "width"),
                t = s(l, "padding-left"),
                i = s(l, "padding-right"),
                a = s(l, "margin-left"),
                r = s(l, "margin-right"),
                o = l.getPropertyValue("box-sizing");
              if (o && "border-box" === o) E = e + a + r;
              else {
                const { clientWidth: s, offsetWidth: l } = n[0];
                E = e + t + i + a + r + (l - s);
              }
            }
            r && (n[0].style.transform = r),
              o && (n[0].style.webkitTransform = o),
              i.roundLengths && (E = Math.floor(E));
          } else
            (E = (l - (i.slidesPerView - 1) * S) / i.slidesPerView),
              i.roundLengths && (E = Math.floor(E)),
              d[a] && (d[a].style[t("width")] = `${E}px`);
          d[a] && (d[a].swiperSlideSize = E),
            m.push(E),
            i.centeredSlides
              ? ((w = w + E / 2 + y / 2 + S),
                0 === y && 0 !== a && (w = w - l / 2 - S),
                0 === a && (w = w - l / 2 - S),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                C % i.slidesPerGroup == 0 && u.push(w),
                h.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(w),
                h.push(w),
                (w = w + E + S)),
            (e.virtualSize += E + S),
            (y = E),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, l) + g),
        n &&
          r &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          a.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
        i.setWrapperSize &&
          a.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
        T && e.grid.updateWrapperSize(E, u, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
          let a = u[s];
          i.roundLengths && (a = Math.floor(a)),
            u[s] <= e.virtualSize - l && t.push(a);
        }
        (u = t),
          Math.floor(e.virtualSize - l) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - l);
      }
      if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
        const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
          [s]: `${S}px`,
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
          e += t + (i.spaceBetween ? i.spaceBetween : 0);
        }),
          (e -= i.spaceBetween);
        const t = e - l;
        u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (m.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
          (e -= i.spaceBetween),
          e < l)
        ) {
          const t = (l - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            h.forEach((e, s) => {
              h[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: m,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        M(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          M(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - m[m.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(o || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.$el.hasClass(t);
        p <= i.maxBackfaceHiddenSlides
          ? s || e.$el.addClass(t)
          : s && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let a,
        l = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) =>
        i
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            s.push(e);
          });
        else
          for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
            const e = t.activeIndex + a;
            if (e > t.slides.length && !i) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (a = 0; a < s.length; a += 1)
        if (void 0 !== s[a]) {
          const e = s[a].offsetHeight;
          l = e > l ? e : l;
        }
      (l || 0 === l) && t.$wrapperEl.css("height", `${l}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let s = 0; s < t.length; s += 1)
        t[s].swiperSlideOffset = e.isHorizontal()
          ? t[s].offsetLeft
          : t[s].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: a, snapGrid: l } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      a && (n = e),
        i.removeClass(s.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < i.length; e += 1) {
        const r = i[e];
        let o = r.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= i[0].swiperSlideOffset);
        const c =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (r.swiperSlideSize + s.spaceBetween),
          d =
            (n - l[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
            (r.swiperSlideSize + s.spaceBetween),
          p = -(n - o),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(r),
          t.visibleSlidesIndexes.push(e),
          i.eq(e).addClass(s.slideVisibleClass)),
          (r.progress = a ? -c : c),
          (r.originalProgress = a ? -d : d);
      }
      t.visibleSlides = C(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: a, isBeginning: l, isEnd: n } = t;
      const r = l,
        o = n;
      0 === i
        ? ((a = 0), (l = !0), (n = !0))
        : ((a = (e - t.minTranslate()) / i), (l = a <= 0), (n = a >= 1)),
        Object.assign(t, { progress: a, isBeginning: l, isEnd: n }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        l && !r && t.emit("reachBeginning toEdge"),
        n && !o && t.emit("reachEnd toEdge"),
        ((r && !l) || (o && !n)) && t.emit("fromEdge"),
        t.emit("progress", a);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          $wrapperEl: i,
          activeIndex: a,
          realIndex: l,
        } = e,
        n = e.virtual && s.virtual.enabled;
      let r;
      t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
      ),
        (r = n
          ? e.$wrapperEl.find(
              `.${s.slideClass}[data-swiper-slide-index="${a}"]`
            )
          : t.eq(a)),
        r.addClass(s.slideActiveClass),
        s.loop &&
          (r.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l}"]`
                )
                .addClass(s.slideDuplicateActiveClass)
            : i
                .children(
                  `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l}"]`
                )
                .addClass(s.slideDuplicateActiveClass));
      let o = r.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
      s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
      let c = r.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
      s.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(s.slidePrevClass)),
        s.loop &&
          (o.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass)
            : i
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${o.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicateNextClass),
          c.hasClass(s.slideDuplicateClass)
            ? i
                .children(
                  `.${s.slideClass}:not(.${
                    s.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)
            : i
                .children(
                  `.${s.slideClass}.${
                    s.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: i,
          snapGrid: a,
          params: l,
          activeIndex: n,
          realIndex: r,
          snapIndex: o,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < i.length; e += 1)
          void 0 !== i[e + 1]
            ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
              ? (d = e)
              : s >= i[e] && s < i[e + 1] && (d = e + 1)
            : s >= i[e] && (d = e);
        l.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (a.indexOf(s) >= 0) c = a.indexOf(s);
      else {
        const e = Math.min(l.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / l.slidesPerGroup);
      }
      if ((c >= a.length && (c = a.length - 1), d === n))
        return void (c !== o && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: n,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        r !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        i = C(e).closest(`.${s.slideClass}`)[0];
      let a,
        l = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (l = !0), (a = e);
            break;
          }
      if (!i || !l)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              C(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = a),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const G = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, $wrapperEl: a } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let l = x(a[0], e);
      return s && (l = -l), l || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: i,
          params: a,
          $wrapperEl: l,
          wrapperEl: n,
          progress: r,
        } = s;
      let o,
        c = 0,
        d = 0;
      s.isHorizontal() ? (c = i ? -e : e) : (d = e),
        a.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        a.cssMode
          ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -c
              : -d)
          : a.virtualTranslate ||
            l.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? c : d);
      const p = s.maxTranslate() - s.minTranslate();
      (o = 0 === p ? 0 : (e - s.minTranslate()) / p),
        o !== r && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const l = this,
        { params: n, wrapperEl: r } = l;
      if (l.animating && n.preventInteractionOnTransition) return !1;
      const o = l.minTranslate(),
        c = l.maxTranslate();
      let d;
      if (
        ((d = i && e > o ? o : i && e < c ? c : e),
        l.updateProgress(d),
        n.cssMode)
      ) {
        const e = l.isHorizontal();
        if (0 === t) r[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!l.support.smoothScroll)
            return (
              k({ swiper: l, targetPosition: -d, side: e ? "left" : "top" }), !0
            );
          r.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (l.setTransition(0),
            l.setTranslate(d),
            s &&
              (l.emit("beforeTransitionStart", t, a), l.emit("transitionEnd")))
          : (l.setTransition(t),
            l.setTranslate(d),
            s &&
              (l.emit("beforeTransitionStart", t, a),
              l.emit("transitionStart")),
            l.animating ||
              ((l.animating = !0),
              l.onTranslateToWrapperTransitionEnd ||
                (l.onTranslateToWrapperTransitionEnd = function (e) {
                  l &&
                    !l.destroyed &&
                    e.target === this &&
                    (l.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      l.onTranslateToWrapperTransitionEnd
                    ),
                    l.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      l.onTranslateToWrapperTransitionEnd
                    ),
                    (l.onTranslateToWrapperTransitionEnd = null),
                    delete l.onTranslateToWrapperTransitionEnd,
                    s && l.emit("transitionEnd"));
                }),
              l.$wrapperEl[0].addEventListener(
                "transitionend",
                l.onTranslateToWrapperTransitionEnd
              ),
              l.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                l.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function H(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: a } = e;
    const { activeIndex: l, previousIndex: n } = t;
    let r = i;
    if (
      (r || (r = l > n ? "next" : l < n ? "prev" : "reset"),
      t.emit(`transition${a}`),
      s && l !== n)
    ) {
      if ("reset" === r) return void t.emit(`slideResetTransition${a}`);
      t.emit(`slideChangeTransition${a}`),
        "next" === r
          ? t.emit(`slideNextTransition${a}`)
          : t.emit(`slidePrevTransition${a}`);
    }
  }
  const N = {
    slideTo: function (e, t, s, i, a) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "number" != typeof e && "string" != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const l = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: r,
        snapGrid: o,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = l;
      if ((l.animating && r.preventInteractionOnTransition) || (!m && !i && !a))
        return !1;
      const f = Math.min(l.params.slidesPerGroupSkip, n);
      let g = f + Math.floor((n - f) / l.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1),
        (p || r.initialSlide || 0) === (d || 0) &&
          s &&
          l.emit("beforeSlideChangeStart");
      const v = -o[g];
      if ((l.updateProgress(v), r.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * c[e]),
            i = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (n = e)
              : t >= s && t < i && (n = e + 1)
            : t >= s && (n = e);
        }
      if (l.initialized && n !== p) {
        if (!l.allowSlideNext && v < l.translate && v < l.minTranslate())
          return !1;
        if (
          !l.allowSlidePrev &&
          v > l.translate &&
          v > l.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      if (
        ((b = n > p ? "next" : n < p ? "prev" : "reset"),
        (u && -v === l.translate) || (!u && v === l.translate))
      )
        return (
          l.updateActiveIndex(n),
          r.autoHeight && l.updateAutoHeight(),
          l.updateSlidesClasses(),
          "slide" !== r.effect && l.setTranslate(v),
          "reset" !== b && (l.transitionStart(s, b), l.transitionEnd(s, b)),
          !1
        );
      if (r.cssMode) {
        const e = l.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = l.virtual && l.params.virtual.enabled;
          t &&
            ((l.wrapperEl.style.scrollSnapType = "none"),
            (l._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (l.wrapperEl.style.scrollSnapType = ""),
                  (l._swiperImmediateVirtual = !1);
              });
        } else {
          if (!l.support.smoothScroll)
            return (
              k({ swiper: l, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        l.setTransition(t),
        l.setTranslate(v),
        l.updateActiveIndex(n),
        l.updateSlidesClasses(),
        l.emit("beforeTransitionStart", t, i),
        l.transitionStart(s, b),
        0 === t
          ? l.transitionEnd(s, b)
          : l.animating ||
            ((l.animating = !0),
            l.onSlideToWrapperTransitionEnd ||
              (l.onSlideToWrapperTransitionEnd = function (e) {
                l &&
                  !l.destroyed &&
                  e.target === this &&
                  (l.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    l.onSlideToWrapperTransitionEnd
                  ),
                  l.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    l.onSlideToWrapperTransitionEnd
                  ),
                  (l.onSlideToWrapperTransitionEnd = null),
                  delete l.onSlideToWrapperTransitionEnd,
                  l.transitionEnd(s, b));
              }),
            l.$wrapperEl[0].addEventListener(
              "transitionend",
              l.onSlideToWrapperTransitionEnd
            ),
            l.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              l.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0);
      const a = this;
      let l = e;
      return a.params.loop && (l += a.loopedSlides), a.slideTo(l, t, s, i);
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { animating: a, enabled: l, params: n } = i;
      if (!l) return i;
      let r = n.slidesPerGroup;
      "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : r;
      if (n.loop) {
        if (a && n.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      return n.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: a,
          animating: l,
          snapGrid: n,
          slidesGrid: r,
          rtlTranslate: o,
          enabled: c,
        } = i;
      if (!c) return i;
      if (a.loop) {
        if (l && a.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(o ? i.translate : -i.translate),
        u = n.map((e) => d(e));
      let h = n[u.indexOf(p) - 1];
      if (void 0 === h && a.cssMode) {
        let e;
        n.forEach((t, s) => {
          p >= t && (e = s);
        }),
          void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
      }
      let m = 0;
      if (
        (void 0 !== h &&
          ((m = r.indexOf(h)),
          m < 0 && (m = i.activeIndex - 1),
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
            (m = Math.max(m, 0)))),
        a.rewind && i.isBeginning)
      ) {
        const a =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(a, e, t, s);
      }
      return i.slideTo(m, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const a = this;
      let l = a.activeIndex;
      const n = Math.min(a.params.slidesPerGroupSkip, l),
        r = n + Math.floor((l - n) / a.params.slidesPerGroup),
        o = a.rtlTranslate ? a.translate : -a.translate;
      if (o >= a.snapGrid[r]) {
        const e = a.snapGrid[r];
        o - e > (a.snapGrid[r + 1] - e) * i && (l += a.params.slidesPerGroup);
      } else {
        const e = a.snapGrid[r - 1];
        o - e <= (a.snapGrid[r] - e) * i && (l -= a.params.slidesPerGroup);
      }
      return (
        (l = Math.max(l, 0)),
        (l = Math.min(l, a.slidesGrid.length - 1)),
        a.slideTo(l, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let a,
        l = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (a = parseInt(C(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? l < e.loopedSlides - i / 2 ||
              l > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (l = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                T(() => {
                  e.slideTo(l);
                }))
              : e.slideTo(l)
            : l > e.slides.length - i
            ? (e.loopFix(),
              (l = s
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              T(() => {
                e.slideTo(l);
              }))
            : e.slideTo(l);
      } else e.slideTo(l);
    },
  };
  const V = {
    loopCreate: function () {
      const e = this,
        t = u(),
        { params: s, $wrapperEl: i } = e,
        a = i.children().length > 0 ? C(i.children()[0].parentNode) : i;
      a.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
      let l = a.children(`.${s.slideClass}`);
      if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (l.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
          for (let i = 0; i < e; i += 1) {
            const e = C(t.createElement("div")).addClass(
              `${s.slideClass} ${s.slideBlankClass}`
            );
            a.append(e);
          }
          l = a.children(`.${s.slideClass}`);
        }
      }
      "auto" !== s.slidesPerView ||
        s.loopedSlides ||
        (s.loopedSlides = l.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(s.loopedSlides || s.slidesPerView, 10)
        )),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > l.length && (e.loopedSlides = l.length);
      const n = [],
        r = [];
      l.each((t, s) => {
        const i = C(t);
        s < e.loopedSlides && r.push(t),
          s < l.length && s >= l.length - e.loopedSlides && n.push(t),
          i.attr("data-swiper-slide-index", s);
      });
      for (let e = 0; e < r.length; e += 1)
        a.append(C(r[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
      for (let e = n.length - 1; e >= 0; e -= 1)
        a.prepend(C(n[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: s,
        loopedSlides: i,
        allowSlidePrev: a,
        allowSlideNext: l,
        snapGrid: n,
        rtlTranslate: r,
      } = e;
      let o;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -n[t] - e.getTranslate();
      if (t < i) {
        (o = s.length - 3 * i + t), (o += i);
        e.slideTo(o, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((r ? -e.translate : e.translate) - c);
      } else if (t >= s.length - i) {
        (o = -s.length + t + i), (o += i);
        e.slideTo(o, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((r ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = a), (e.allowSlideNext = l), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: s } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        s.removeAttr("data-swiper-slide-index");
    },
  };
  function j(e) {
    const t = this,
      s = u(),
      i = m(),
      a = t.touchEventsData,
      { params: l, touches: n, enabled: r } = t;
    if (!r) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let o = e;
    o.originalEvent && (o = o.originalEvent);
    let c = C(o.target);
    if ("wrapper" === l.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((a.isTouchEvent = "touchstart" === o.type),
      !a.isTouchEvent && "which" in o && 3 === o.which)
    )
      return;
    if (!a.isTouchEvent && "button" in o && o.button > 0) return;
    if (a.isTouched && a.isMoved) return;
    !!l.noSwipingClass &&
      "" !== l.noSwipingClass &&
      o.target &&
      o.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = C(e.path[0]));
    const d = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      p = !(!o.target || !o.target.shadowRoot);
    if (
      l.noSwiping &&
      (p
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                return s && s !== u() && s !== m()
                  ? (s.assignedSlot && (s = s.assignedSlot),
                    s.closest(e) || t(s.getRootNode().host))
                  : null;
              })(t)
            );
          })(d, o.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !c.closest(l.swipeHandler)[0]) return;
    (n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
      (n.currentY =
        "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
    const h = n.currentX,
      f = n.currentY,
      g = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
      v = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (g && (h <= v || h >= i.innerWidth - v)) {
      if ("prevent" !== g) return;
      e.preventDefault();
    }
    if (
      (Object.assign(a, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (n.startX = h),
      (n.startY = f),
      (a.touchStartTime = E()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (a.allowThresholdMove = !1),
      "touchstart" !== o.type)
    ) {
      let e = !0;
      c.is(a.focusableElements) &&
        ((e = !1), "SELECT" === c[0].nodeName && (a.isTouched = !1)),
        s.activeElement &&
          C(s.activeElement).is(a.focusableElements) &&
          s.activeElement !== c[0] &&
          s.activeElement.blur();
      const i = e && t.allowTouchMove && l.touchStartPreventDefault;
      (!l.touchStartForcePreventDefault && !i) ||
        c[0].isContentEditable ||
        o.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !l.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", o);
  }
  function F(e) {
    const t = u(),
      s = this,
      i = s.touchEventsData,
      { params: a, touches: l, rtlTranslate: n, enabled: r } = s;
    if (!r) return;
    let o = e;
    if ((o.originalEvent && (o = o.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", o)
      );
    if (i.isTouchEvent && "touchmove" !== o.type) return;
    const c =
        "touchmove" === o.type &&
        o.targetTouches &&
        (o.targetTouches[0] || o.changedTouches[0]),
      d = "touchmove" === o.type ? c.pageX : o.pageX,
      p = "touchmove" === o.type ? c.pageY : o.pageY;
    if (o.preventedByNestedSwiper) return (l.startX = d), void (l.startY = p);
    if (!s.allowTouchMove)
      return (
        C(o.target).is(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(l, { startX: d, startY: p, currentX: d, currentY: p }),
          (i.touchStartTime = E()))
        )
      );
    if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
      if (s.isVertical()) {
        if (
          (p < l.startY && s.translate <= s.maxTranslate()) ||
          (p > l.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (d < l.startX && s.translate <= s.maxTranslate()) ||
        (d > l.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      o.target === t.activeElement &&
      C(o.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", o),
      o.targetTouches && o.targetTouches.length > 1)
    )
      return;
    (l.currentX = d), (l.currentY = p);
    const h = l.currentX - l.startX,
      m = l.currentY - l.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + m ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && l.currentY === l.startY) ||
      (s.isVertical() && l.currentX === l.startX)
        ? (i.isScrolling = !1)
        : h * h + m * m >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(m), Math.abs(h))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > a.touchAngle
            : 90 - e > a.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", o),
      void 0 === i.startMoving &&
        ((l.currentX === l.startX && l.currentY === l.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !a.cssMode && o.cancelable && o.preventDefault(),
      a.touchMoveStopPropagation && !a.nested && o.stopPropagation(),
      i.isMoved ||
        (a.loop && !a.cssMode && s.loopFix(),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating &&
          s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !a.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", o)),
      s.emit("sliderMove", o),
      (i.isMoved = !0);
    let f = s.isHorizontal() ? h : m;
    (l.diff = f),
      (f *= a.touchRatio),
      n && (f = -f),
      (s.swipeDirection = f > 0 ? "prev" : "next"),
      (i.currentTranslate = f + i.startTranslate);
    let g = !0,
      v = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (v = 0),
      f > 0 && i.currentTranslate > s.minTranslate()
        ? ((g = !1),
          a.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + f) ** v))
        : f < 0 &&
          i.currentTranslate < s.maxTranslate() &&
          ((g = !1),
          a.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - f) ** v)),
      g && (o.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      a.threshold > 0)
    ) {
      if (!(Math.abs(f) > a.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (l.startX = l.currentX),
          (l.startY = l.currentY),
          (i.currentTranslate = i.startTranslate),
          void (l.diff = s.isHorizontal()
            ? l.currentX - l.startX
            : l.currentY - l.startY)
        );
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
        a.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      s.params.freeMode &&
        a.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function W(e) {
    const t = this,
      s = t.touchEventsData,
      { params: i, touches: a, rtlTranslate: l, slidesGrid: n, enabled: r } = t;
    if (!r) return;
    let o = e;
    if (
      (o.originalEvent && (o = o.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", o),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    i.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = E(),
      d = c - s.touchStartTime;
    if (t.allowClick) {
      const e = o.path || (o.composedPath && o.composedPath());
      t.updateClickedSlide((e && e[0]) || o.target),
        t.emit("tap click", o),
        d < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", o);
    }
    if (
      ((s.lastClickTime = E()),
      T(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === a.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (p = i.followFinger
        ? l
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      i.cssMode)
    )
      return;
    if (t.params.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < n.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== n[e + t]
        ? p >= n[e] && p < n[e + t] && ((u = e), (h = n[e + t] - n[e]))
        : p >= n[e] && ((u = e), (h = n[n.length - 1] - n[n.length - 2]));
    }
    let m = null,
      f = null;
    i.rewind &&
      (t.isBeginning
        ? (f =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (m = 0));
    const g = (p - n[u]) / h,
      v = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (d > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (g >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? m : u + v)
          : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (g > 1 - i.longSwipesRatio
            ? t.slideTo(u + v)
            : null !== f && g < 0 && Math.abs(g) > i.longSwipesRatio
            ? t.slideTo(f)
            : t.slideTo(u));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
        ? o.target === t.navigation.nextEl
          ? t.slideTo(u + v)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(null !== m ? m : u + v),
          "prev" === t.swipeDirection && t.slideTo(null !== f ? f : u));
    }
  }
  function R() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: a, snapGrid: l } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = a),
      (e.allowSlideNext = i),
      e.params.watchOverflow && l !== e.snapGrid && e.checkOverflow();
  }
  function Y(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function X() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let a;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const l = e.maxTranslate() - e.minTranslate();
    (a = 0 === l ? 0 : (e.translate - e.minTranslate()) / l),
      a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let U = !1;
  function K() {}
  const Z = (e, t) => {
    const s = u(),
      {
        params: i,
        touchEvents: a,
        el: l,
        wrapperEl: n,
        device: r,
        support: o,
      } = e,
      c = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (o.touch) {
      const t = !(
        "touchstart" !== a.start ||
        !o.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      l[d](a.start, e.onTouchStart, t),
        l[d](
          a.move,
          e.onTouchMove,
          o.passiveListener ? { passive: !1, capture: c } : c
        ),
        l[d](a.end, e.onTouchEnd, t),
        a.cancel && l[d](a.cancel, e.onTouchEnd, t);
    } else
      l[d](a.start, e.onTouchStart, !1),
        s[d](a.move, e.onTouchMove, c),
        s[d](a.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      l[d]("click", e.onClick, !0),
      i.cssMode && n[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[p](
            r.ios || r.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            R,
            !0
          )
        : e[p]("observerUpdate", R, !0);
  };
  const J = {
      attachEvents: function () {
        const e = this,
          t = u(),
          { params: s, support: i } = e;
        (e.onTouchStart = j.bind(e)),
          (e.onTouchMove = F.bind(e)),
          (e.onTouchEnd = W.bind(e)),
          s.cssMode && (e.onScroll = X.bind(e)),
          (e.onClick = Y.bind(e)),
          i.touch && !U && (t.addEventListener("touchstart", K), (U = !0)),
          Z(e, "on");
      },
      detachEvents: function () {
        Z(this, "off");
      },
    },
    Q = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const ee = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: s,
          loopedSlides: i = 0,
          params: a,
          $el: l,
        } = e,
        n = a.breakpoints;
      if (!n || (n && 0 === Object.keys(n).length)) return;
      const r = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
      if (!r || e.currentBreakpoint === r) return;
      const o = (r in n ? n[r] : void 0) || e.originalParams,
        c = Q(e, a),
        d = Q(e, o),
        p = a.enabled;
      c && !d
        ? (l.removeClass(
            `${a.containerModifierClass}grid ${a.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (l.addClass(`${a.containerModifierClass}grid`),
          ((o.grid.fill && "column" === o.grid.fill) ||
            (!o.grid.fill && "column" === a.grid.fill)) &&
            l.addClass(`${a.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = o.direction && o.direction !== a.direction,
        h = a.loop && (o.slidesPerView !== a.slidesPerView || u);
      u && s && e.changeDirection(), A(e.params, o);
      const m = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !m ? e.disable() : !p && m && e.enable(),
        (e.currentBreakpoint = r),
        e.emit("_beforeBreakpoint", o),
        h &&
          s &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - i + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", o);
    },
    getBreakpoint: function (e, t, s) {
      if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
        return;
      let i = !1;
      const a = m(),
        l = "window" === t ? a.innerHeight : s.clientHeight,
        n = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: l * t, point: e };
          }
          return { value: e, point: e };
        });
      n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < n.length; e += 1) {
        const { point: l, value: r } = n[e];
        "window" === t
          ? a.matchMedia(`(min-width: ${r}px)`).matches && (i = l)
          : r <= s.clientWidth && (i = l);
      }
      return i || "max";
    },
  };
  const te = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: s, rtl: i, $el: a, device: l, support: n } = e,
        r = (function (e, t) {
          const s = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && s.push(t + i);
                  })
                : "string" == typeof e && s.push(t + e);
            }),
            s
          );
        })(
          [
            "initialized",
            s.direction,
            { "pointer-events": !n.touch },
            { "free-mode": e.params.freeMode && s.freeMode.enabled },
            { autoheight: s.autoHeight },
            { rtl: i },
            { grid: s.grid && s.grid.rows > 1 },
            {
              "grid-column":
                s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
            },
            { android: l.android },
            { ios: l.ios },
            { "css-mode": s.cssMode },
            { centered: s.cssMode && s.centeredSlides },
          ],
          s.containerModifierClass
        );
      t.push(...r), a.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const se = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ie(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        a = s[i];
      "object" == typeof a && null !== a
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in a
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              A(t, s))
            : A(t, s))
        : A(t, s);
    };
  }
  const ae = {
      eventsEmitter: B,
      update: q,
      translate: G,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || s.$wrapperEl.transition(e),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            H({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              H({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: N,
      loop: V,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (s.style.cursor = "move"),
            (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (s.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: J,
      breakpoints: ee,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: te,
      images: {
        loadImage: function (e, t, s, i, a, l) {
          const n = m();
          let r;
          function o() {
            l && l();
          }
          C(e).parent("picture")[0] || (e.complete && a)
            ? o()
            : t
            ? ((r = new n.Image()),
              (r.onload = o),
              (r.onerror = o),
              i && (r.sizes = i),
              s && (r.srcset = s),
              t && (r.src = t))
            : o();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let s = 0; s < e.imagesToLoad.length; s += 1) {
            const i = e.imagesToLoad[s];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    le = {};
  class ne {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), a = 0; a < s; a++)
        i[a] = arguments[a];
      if (
        (1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
        t || (t = {}),
        (t = A({}, t)),
        e && !t.el && (t.el = e),
        t.el && C(t.el).length > 1)
      ) {
        const e = [];
        return (
          C(t.el).each((s) => {
            const i = A({}, t, { el: s });
            e.push(new ne(i));
          }),
          e
        );
      }
      const l = this;
      (l.__swiper__ = !0),
        (l.support = z()),
        (l.device = I({ userAgent: t.userAgent })),
        (l.browser = D()),
        (l.eventsListeners = {}),
        (l.eventsAnyListeners = []),
        (l.modules = [...l.__modules__]),
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
      const n = {};
      l.modules.forEach((e) => {
        e({
          swiper: l,
          extendParams: ie(t, n),
          on: l.on.bind(l),
          once: l.once.bind(l),
          off: l.off.bind(l),
          emit: l.emit.bind(l),
        });
      });
      const r = A({}, se, n);
      return (
        (l.params = A({}, r, le, t)),
        (l.originalParams = A({}, l.params)),
        (l.passedParams = A({}, t)),
        l.params &&
          l.params.on &&
          Object.keys(l.params.on).forEach((e) => {
            l.on(e, l.params.on[e]);
          }),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
        (l.$ = C),
        Object.assign(l, {
          enabled: l.params.enabled,
          el: e,
          classNames: [],
          slides: C(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === l.params.direction,
          isVertical: () => "vertical" === l.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: l.params.allowSlideNext,
          allowSlidePrev: l.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (l.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (l.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              l.support.touch || !l.params.simulateTouch
                ? l.touchEventsTouch
                : l.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: l.params.focusableElements,
            lastClickTime: E(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: l.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        l.emit("_swiper"),
        l.params.init && l.init(),
        l
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        a = (s.maxTranslate() - i) * e + i;
      s.translateTo(a, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: a,
        slidesSizesGrid: l,
        size: n,
        activeIndex: r,
      } = this;
      let o = 1;
      if (s.centeredSlides) {
        let e,
          t = i[r].swiperSlideSize;
        for (let s = r + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        for (let s = r - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = r + 1; e < i.length; e += 1) {
          (t ? a[e] + l[e] - a[r] < n : a[e] - a[r] < n) && (o += 1);
        }
      else
        for (let e = r - 1; e >= 0; e -= 1) {
          a[r] - a[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let a;
      s.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (i(), e.params.autoHeight && e.updateAutoHeight())
          : ((a =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            a || i()),
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.$el
            .removeClass(`${s.params.containerModifierClass}${i}`)
            .addClass(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const s = C(e || t.params.el);
      if (!(e = s[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let a = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = C(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => s.children(e)), t;
        }
        return s.children(i());
      })();
      if (0 === a.length && t.params.createElements) {
        const e = u().createElement("div");
        (a = C(e)),
          (e.className = t.params.wrapperClass),
          s.append(e),
          s.children(`.${t.params.slideClass}`).each((e) => {
            a.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: s,
          el: e,
          $wrapperEl: a,
          wrapperEl: a[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
          wrongRTL: "-webkit-box" === a.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, $el: a, $wrapperEl: l, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            a.removeAttr("style"),
            l.removeAttr("style"),
            n &&
              n.length &&
              n
                .removeClass(
                  [
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      A(le, e);
    }
    static get extendedDefaults() {
      return le;
    }
    static get defaults() {
      return se;
    }
    static installModule(e) {
      ne.prototype.__modules__ || (ne.prototype.__modules__ = []);
      const t = ne.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ne.installModule(e)), ne)
        : (ne.installModule(e), ne);
    }
  }
  Object.keys(ae).forEach((e) => {
    Object.keys(ae[e]).forEach((t) => {
      ne.prototype[t] = ae[e][t];
    });
  }),
    ne.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const a = m();
        let l = null,
          n = null;
        const r = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== a.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((l = new ResizeObserver((e) => {
                n = a.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let a = s,
                    l = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: n } = e;
                    (n && n !== t.el) ||
                      ((a = i ? i.width : (s[0] || s).inlineSize),
                      (l = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (a === s && l === i) || r();
                });
              })),
              l.observe(t.el))
            : (a.addEventListener("resize", r),
              a.addEventListener("orientationchange", o));
        }),
          s("destroy", () => {
            n && a.cancelAnimationFrame(n),
              l && l.unobserve && t.el && (l.unobserve(t.el), (l = null)),
              a.removeEventListener("resize", r),
              a.removeEventListener("orientationchange", o);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: a } = e;
        const l = [],
          n = m(),
          r = function (e, t) {
            void 0 === t && (t = {});
            const s = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const t = function () {
                  a("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(t)
                  : n.setTimeout(t, 0);
              }
            );
            s.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              l.push(s);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) r(e[t]);
              }
              r(t.$el[0], { childList: t.params.observeSlideChildren }),
                r(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            l.forEach((e) => {
              e.disconnect();
            }),
              l.splice(0, l.length);
          });
      },
    ]);
  const re = ne;
  function oe(e, t, s, i) {
    const a = u();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((l) => {
          if (!s[l] && !0 === s.auto) {
            let n = e.$el.children(`.${i[l]}`)[0];
            n ||
              ((n = a.createElement("div")),
              (n.className = i[l]),
              e.$el.append(n)),
              (s[l] = n),
              (t[l] = n);
          }
        }),
      s
    );
  }
  function ce(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function de(e) {
    let { swiper: t, extendParams: s, on: i, emit: a } = e;
    const l = "swiper-pagination";
    let n;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${l}-bullet`,
        bulletActiveClass: `${l}-bullet-active`,
        modifierClass: `${l}-`,
        currentClass: `${l}-current`,
        totalClass: `${l}-total`,
        hiddenClass: `${l}-hidden`,
        progressbarFillClass: `${l}-progressbar-fill`,
        progressbarOppositeClass: `${l}-progressbar-opposite`,
        clickableClass: `${l}-clickable`,
        lockClass: `${l}-lock`,
        horizontalClass: `${l}-horizontal`,
        verticalClass: `${l}-vertical`,
      },
    }),
      (t.pagination = { el: null, $el: null, bullets: [] });
    let r = 0;
    function o() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        !t.pagination.$el ||
        0 === t.pagination.$el.length
      );
    }
    function c(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
    }
    function d() {
      const e = t.rtl,
        s = t.params.pagination;
      if (o()) return;
      const i =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        l = t.pagination.$el;
      let d;
      const p = t.params.loop
        ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
        : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((d = Math.ceil(
              (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
            )),
            d > i - 1 - 2 * t.loopedSlides && (d -= i - 2 * t.loopedSlides),
            d > p - 1 && (d -= p),
            d < 0 && "bullets" !== t.params.paginationType && (d = p + d))
          : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const i = t.pagination.bullets;
        let a, o, p;
        if (
          (s.dynamicBullets &&
            ((n = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            l.css(
              t.isHorizontal() ? "width" : "height",
              n * (s.dynamicMainBullets + 4) + "px"
            ),
            s.dynamicMainBullets > 1 &&
              void 0 !== t.previousIndex &&
              ((r += d - (t.previousIndex - t.loopedSlides || 0)),
              r > s.dynamicMainBullets - 1
                ? (r = s.dynamicMainBullets - 1)
                : r < 0 && (r = 0)),
            (a = Math.max(d - r, 0)),
            (o = a + (Math.min(i.length, s.dynamicMainBullets) - 1)),
            (p = (o + a) / 2)),
          i.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${s.bulletActiveClass}${e}`)
              .join(" ")
          ),
          l.length > 1)
        )
          i.each((e) => {
            const t = C(e),
              i = t.index();
            i === d && t.addClass(s.bulletActiveClass),
              s.dynamicBullets &&
                (i >= a && i <= o && t.addClass(`${s.bulletActiveClass}-main`),
                i === a && c(t, "prev"),
                i === o && c(t, "next"));
          });
        else {
          const e = i.eq(d),
            l = e.index();
          if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
            const e = i.eq(a),
              n = i.eq(o);
            for (let e = a; e <= o; e += 1)
              i.eq(e).addClass(`${s.bulletActiveClass}-main`);
            if (t.params.loop)
              if (l >= i.length) {
                for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                  i.eq(i.length - e).addClass(`${s.bulletActiveClass}-main`);
                i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                  `${s.bulletActiveClass}-prev`
                );
              } else c(e, "prev"), c(n, "next");
            else c(e, "prev"), c(n, "next");
          }
        }
        if (s.dynamicBullets) {
          const a = Math.min(i.length, s.dynamicMainBullets + 4),
            l = (n * a - n) / 2 - p * n,
            r = e ? "right" : "left";
          i.css(t.isHorizontal() ? r : "top", `${l}px`);
        }
      }
      if (
        ("fraction" === s.type &&
          (l.find(ce(s.currentClass)).text(s.formatFractionCurrent(d + 1)),
          l.find(ce(s.totalClass)).text(s.formatFractionTotal(p))),
        "progressbar" === s.type)
      ) {
        let e;
        e = s.progressbarOpposite
          ? t.isHorizontal()
            ? "vertical"
            : "horizontal"
          : t.isHorizontal()
          ? "horizontal"
          : "vertical";
        const i = (d + 1) / p;
        let a = 1,
          n = 1;
        "horizontal" === e ? (a = i) : (n = i),
          l
            .find(ce(s.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${a}) scaleY(${n})`)
            .transition(t.params.speed);
      }
      "custom" === s.type && s.renderCustom
        ? (l.html(s.renderCustom(t, d + 1, p)), a("paginationRender", l[0]))
        : a("paginationUpdate", l[0]),
        t.params.watchOverflow &&
          t.enabled &&
          l[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
    }
    function p() {
      const e = t.params.pagination;
      if (o()) return;
      const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        i = t.pagination.$el;
      let l = "";
      if ("bullets" === e.type) {
        let a = t.params.loop
          ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          !t.params.loop &&
          a > s &&
          (a = s);
        for (let s = 0; s < a; s += 1)
          e.renderBullet
            ? (l += e.renderBullet.call(t, s, e.bulletClass))
            : (l += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
        i.html(l), (t.pagination.bullets = i.find(ce(e.bulletClass)));
      }
      "fraction" === e.type &&
        ((l = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        i.html(l)),
        "progressbar" === e.type &&
          ((l = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
          i.html(l)),
        "custom" !== e.type && a("paginationRender", t.pagination.$el[0]);
    }
    function u() {
      t.params.pagination = oe(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" }
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s = C(e.el);
      0 !== s.length &&
        (t.params.uniqueNavElements &&
          "string" == typeof e.el &&
          s.length > 1 &&
          ((s = t.$el.find(e.el)),
          s.length > 1 &&
            (s = s.filter((e) => C(e).parents(".swiper")[0] === t.el))),
        "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
        s.addClass(e.modifierClass + e.type),
        s.addClass(e.modifierClass + t.params.direction),
        "bullets" === e.type &&
          e.dynamicBullets &&
          (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
          (r = 0),
          e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
        "progressbar" === e.type &&
          e.progressbarOpposite &&
          s.addClass(e.progressbarOppositeClass),
        e.clickable &&
          s.on("click", ce(e.bulletClass), function (e) {
            e.preventDefault();
            let s = C(this).index() * t.params.slidesPerGroup;
            t.params.loop && (s += t.loopedSlides), t.slideTo(s);
          }),
        Object.assign(t.pagination, { $el: s, el: s[0] }),
        t.enabled || s.addClass(e.lockClass));
    }
    function h() {
      const e = t.params.pagination;
      if (o()) return;
      const s = t.pagination.$el;
      s.removeClass(e.hiddenClass),
        s.removeClass(e.modifierClass + e.type),
        s.removeClass(e.modifierClass + t.params.direction),
        t.pagination.bullets &&
          t.pagination.bullets.removeClass &&
          t.pagination.bullets.removeClass(e.bulletActiveClass),
        e.clickable && s.off("click", ce(e.bulletClass));
    }
    i("init", () => {
      u(), p(), d();
    }),
      i("activeIndexChange", () => {
        (t.params.loop || void 0 === t.snapIndex) && d();
      }),
      i("snapIndexChange", () => {
        t.params.loop || d();
      }),
      i("slidesLengthChange", () => {
        t.params.loop && (p(), d());
      }),
      i("snapGridLengthChange", () => {
        t.params.loop || (p(), d());
      }),
      i("destroy", () => {
        h();
      }),
      i("enable disable", () => {
        const { $el: e } = t.pagination;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.pagination.lockClass
          );
      }),
      i("lock unlock", () => {
        d();
      }),
      i("click", (e, s) => {
        const i = s.target,
          { $el: l } = t.pagination;
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          l.length > 0 &&
          !C(i).hasClass(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = l.hasClass(t.params.pagination.hiddenClass);
          a(!0 === e ? "paginationShow" : "paginationHide"),
            l.toggleClass(t.params.pagination.hiddenClass);
        }
      }),
      Object.assign(t.pagination, {
        render: p,
        update: d,
        init: u,
        destroy: h,
      });
  }
  function pe(e) {
    let { swiper: t, extendParams: s, on: i, emit: a } = e;
    const l = u();
    let n,
      r,
      o,
      c,
      d = !1,
      p = null,
      h = null;
    function m() {
      if (!t.params.scrollbar.el || !t.scrollbar.el) return;
      const { scrollbar: e, rtlTranslate: s, progress: i } = t,
        { $dragEl: a, $el: l } = e,
        n = t.params.scrollbar;
      let c = r,
        d = (o - r) * i;
      s
        ? ((d = -d), d > 0 ? ((c = r - d), (d = 0)) : -d + r > o && (c = o + d))
        : d < 0
        ? ((c = r + d), (d = 0))
        : d + r > o && (c = o - d),
        t.isHorizontal()
          ? (a.transform(`translate3d(${d}px, 0, 0)`),
            (a[0].style.width = `${c}px`))
          : (a.transform(`translate3d(0px, ${d}px, 0)`),
            (a[0].style.height = `${c}px`)),
        n.hide &&
          (clearTimeout(p),
          (l[0].style.opacity = 1),
          (p = setTimeout(() => {
            (l[0].style.opacity = 0), l.transition(400);
          }, 1e3)));
    }
    function f() {
      if (!t.params.scrollbar.el || !t.scrollbar.el) return;
      const { scrollbar: e } = t,
        { $dragEl: s, $el: i } = e;
      (s[0].style.width = ""),
        (s[0].style.height = ""),
        (o = t.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight),
        (c =
          t.size /
          (t.virtualSize +
            t.params.slidesOffsetBefore -
            (t.params.centeredSlides ? t.snapGrid[0] : 0))),
        (r =
          "auto" === t.params.scrollbar.dragSize
            ? o * c
            : parseInt(t.params.scrollbar.dragSize, 10)),
        t.isHorizontal()
          ? (s[0].style.width = `${r}px`)
          : (s[0].style.height = `${r}px`),
        (i[0].style.display = c >= 1 ? "none" : ""),
        t.params.scrollbar.hide && (i[0].style.opacity = 0),
        t.params.watchOverflow &&
          t.enabled &&
          e.$el[t.isLocked ? "addClass" : "removeClass"](
            t.params.scrollbar.lockClass
          );
    }
    function g(e) {
      return t.isHorizontal()
        ? "touchstart" === e.type || "touchmove" === e.type
          ? e.targetTouches[0].clientX
          : e.clientX
        : "touchstart" === e.type || "touchmove" === e.type
        ? e.targetTouches[0].clientY
        : e.clientY;
    }
    function v(e) {
      const { scrollbar: s, rtlTranslate: i } = t,
        { $el: a } = s;
      let l;
      (l =
        (g(e) -
          a.offset()[t.isHorizontal() ? "left" : "top"] -
          (null !== n ? n : r / 2)) /
        (o - r)),
        (l = Math.max(Math.min(l, 1), 0)),
        i && (l = 1 - l);
      const c = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * l;
      t.updateProgress(c),
        t.setTranslate(c),
        t.updateActiveIndex(),
        t.updateSlidesClasses();
    }
    function b(e) {
      const s = t.params.scrollbar,
        { scrollbar: i, $wrapperEl: l } = t,
        { $el: r, $dragEl: o } = i;
      (d = !0),
        (n =
          e.target === o[0] || e.target === o
            ? g(e) -
              e.target.getBoundingClientRect()[
                t.isHorizontal() ? "left" : "top"
              ]
            : null),
        e.preventDefault(),
        e.stopPropagation(),
        l.transition(100),
        o.transition(100),
        v(e),
        clearTimeout(h),
        r.transition(0),
        s.hide && r.css("opacity", 1),
        t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
        a("scrollbarDragStart", e);
    }
    function S(e) {
      const { scrollbar: s, $wrapperEl: i } = t,
        { $el: l, $dragEl: n } = s;
      d &&
        (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
        v(e),
        i.transition(0),
        l.transition(0),
        n.transition(0),
        a("scrollbarDragMove", e));
    }
    function w(e) {
      const s = t.params.scrollbar,
        { scrollbar: i, $wrapperEl: l } = t,
        { $el: n } = i;
      d &&
        ((d = !1),
        t.params.cssMode &&
          (t.$wrapperEl.css("scroll-snap-type", ""), l.transition("")),
        s.hide &&
          (clearTimeout(h),
          (h = T(() => {
            n.css("opacity", 0), n.transition(400);
          }, 1e3))),
        a("scrollbarDragEnd", e),
        s.snapOnRelease && t.slideToClosest());
    }
    function y(e) {
      const {
          scrollbar: s,
          touchEventsTouch: i,
          touchEventsDesktop: a,
          params: n,
          support: r,
        } = t,
        o = s.$el[0],
        c = !(!r.passiveListener || !n.passiveListeners) && {
          passive: !1,
          capture: !1,
        },
        d = !(!r.passiveListener || !n.passiveListeners) && {
          passive: !0,
          capture: !1,
        };
      if (!o) return;
      const p = "on" === e ? "addEventListener" : "removeEventListener";
      r.touch
        ? (o[p](i.start, b, c), o[p](i.move, S, c), o[p](i.end, w, d))
        : (o[p](a.start, b, c), l[p](a.move, S, c), l[p](a.end, w, d));
    }
    function E() {
      const { scrollbar: e, $el: s } = t;
      t.params.scrollbar = oe(
        t,
        t.originalParams.scrollbar,
        t.params.scrollbar,
        { el: "swiper-scrollbar" }
      );
      const i = t.params.scrollbar;
      if (!i.el) return;
      let a = C(i.el);
      t.params.uniqueNavElements &&
        "string" == typeof i.el &&
        a.length > 1 &&
        1 === s.find(i.el).length &&
        (a = s.find(i.el));
      let l = a.find(`.${t.params.scrollbar.dragClass}`);
      0 === l.length &&
        ((l = C(`<div class="${t.params.scrollbar.dragClass}"></div>`)),
        a.append(l)),
        Object.assign(e, { $el: a, el: a[0], $dragEl: l, dragEl: l[0] }),
        i.draggable && t.params.scrollbar.el && y("on"),
        a &&
          a[t.enabled ? "removeClass" : "addClass"](
            t.params.scrollbar.lockClass
          );
    }
    function x() {
      t.params.scrollbar.el && y("off");
    }
    s({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
      },
    }),
      (t.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
      i("init", () => {
        E(), f(), m();
      }),
      i("update resize observerUpdate lock unlock", () => {
        f();
      }),
      i("setTranslate", () => {
        m();
      }),
      i("setTransition", (e, s) => {
        !(function (e) {
          t.params.scrollbar.el &&
            t.scrollbar.el &&
            t.scrollbar.$dragEl.transition(e);
        })(s);
      }),
      i("enable disable", () => {
        const { $el: e } = t.scrollbar;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.scrollbar.lockClass
          );
      }),
      i("destroy", () => {
        x();
      }),
      Object.assign(t.scrollbar, {
        updateSize: f,
        setTranslate: m,
        init: E,
        destroy: x,
      });
  }
  function ue(e) {
    let { swiper: t, extendParams: s, on: i, emit: a } = e;
    s({
      lazy: {
        checkInView: !1,
        enabled: !1,
        loadPrevNext: !1,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: !1,
        scrollingElement: "",
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader",
      },
    }),
      (t.lazy = {});
    let l = !1,
      n = !1;
    function r(e, s) {
      void 0 === s && (s = !0);
      const i = t.params.lazy;
      if (void 0 === e) return;
      if (0 === t.slides.length) return;
      const l =
          t.virtual && t.params.virtual.enabled
            ? t.$wrapperEl.children(
                `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
              )
            : t.slides.eq(e),
        n = l.find(
          `.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`
        );
      !l.hasClass(i.elementClass) ||
        l.hasClass(i.loadedClass) ||
        l.hasClass(i.loadingClass) ||
        n.push(l[0]),
        0 !== n.length &&
          n.each((e) => {
            const n = C(e);
            n.addClass(i.loadingClass);
            const o = n.attr("data-background"),
              c = n.attr("data-src"),
              d = n.attr("data-srcset"),
              p = n.attr("data-sizes"),
              u = n.parent("picture");
            t.loadImage(n[0], c || o, d, p, !1, () => {
              if (null != t && t && (!t || t.params) && !t.destroyed) {
                if (
                  (o
                    ? (n.css("background-image", `url("${o}")`),
                      n.removeAttr("data-background"))
                    : (d && (n.attr("srcset", d), n.removeAttr("data-srcset")),
                      p && (n.attr("sizes", p), n.removeAttr("data-sizes")),
                      u.length &&
                        u.children("source").each((e) => {
                          const t = C(e);
                          t.attr("data-srcset") &&
                            (t.attr("srcset", t.attr("data-srcset")),
                            t.removeAttr("data-srcset"));
                        }),
                      c && (n.attr("src", c), n.removeAttr("data-src"))),
                  n.addClass(i.loadedClass).removeClass(i.loadingClass),
                  l.find(`.${i.preloaderClass}`).remove(),
                  t.params.loop && s)
                ) {
                  const e = l.attr("data-swiper-slide-index");
                  if (l.hasClass(t.params.slideDuplicateClass)) {
                    r(
                      t.$wrapperEl
                        .children(
                          `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                        )
                        .index(),
                      !1
                    );
                  } else {
                    r(
                      t.$wrapperEl
                        .children(
                          `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                        )
                        .index(),
                      !1
                    );
                  }
                }
                a("lazyImageReady", l[0], n[0]),
                  t.params.autoHeight && t.updateAutoHeight();
              }
            }),
              a("lazyImageLoad", l[0], n[0]);
          });
    }
    function o() {
      const { $wrapperEl: e, params: s, slides: i, activeIndex: a } = t,
        l = t.virtual && s.virtual.enabled,
        o = s.lazy;
      let c = s.slidesPerView;
      function d(t) {
        if (l) {
          if (
            e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`)
              .length
          )
            return !0;
        } else if (i[t]) return !0;
        return !1;
      }
      function p(e) {
        return l ? C(e).attr("data-swiper-slide-index") : C(e).index();
      }
      if (
        ("auto" === c && (c = 0), n || (n = !0), t.params.watchSlidesProgress)
      )
        e.children(`.${s.slideVisibleClass}`).each((e) => {
          r(l ? C(e).attr("data-swiper-slide-index") : C(e).index());
        });
      else if (c > 1) for (let e = a; e < a + c; e += 1) d(e) && r(e);
      else r(a);
      if (o.loadPrevNext)
        if (c > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
          const e = o.loadPrevNextAmount,
            t = c,
            s = Math.min(a + t + Math.max(e, t), i.length),
            l = Math.max(a - Math.max(t, e), 0);
          for (let e = a + c; e < s; e += 1) d(e) && r(e);
          for (let e = l; e < a; e += 1) d(e) && r(e);
        } else {
          const t = e.children(`.${s.slideNextClass}`);
          t.length > 0 && r(p(t));
          const i = e.children(`.${s.slidePrevClass}`);
          i.length > 0 && r(p(i));
        }
    }
    function c() {
      const e = m();
      if (!t || t.destroyed) return;
      const s = t.params.lazy.scrollingElement
          ? C(t.params.lazy.scrollingElement)
          : C(e),
        i = s[0] === e,
        a = i ? e.innerWidth : s[0].offsetWidth,
        n = i ? e.innerHeight : s[0].offsetHeight,
        r = t.$el.offset(),
        { rtlTranslate: d } = t;
      let p = !1;
      d && (r.left -= t.$el[0].scrollLeft);
      const u = [
        [r.left, r.top],
        [r.left + t.width, r.top],
        [r.left, r.top + t.height],
        [r.left + t.width, r.top + t.height],
      ];
      for (let e = 0; e < u.length; e += 1) {
        const t = u[e];
        if (t[0] >= 0 && t[0] <= a && t[1] >= 0 && t[1] <= n) {
          if (0 === t[0] && 0 === t[1]) continue;
          p = !0;
        }
      }
      const h = !(
        "touchstart" !== t.touchEvents.start ||
        !t.support.passiveListener ||
        !t.params.passiveListeners
      ) && { passive: !0, capture: !1 };
      p ? (o(), s.off("scroll", c, h)) : l || ((l = !0), s.on("scroll", c, h));
    }
    i("beforeInit", () => {
      t.params.lazy.enabled &&
        t.params.preloadImages &&
        (t.params.preloadImages = !1);
    }),
      i("init", () => {
        t.params.lazy.enabled && (t.params.lazy.checkInView ? c() : o());
      }),
      i("scroll", () => {
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          !t.params.freeMode.sticky &&
          o();
      }),
      i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
        t.params.lazy.enabled && (t.params.lazy.checkInView ? c() : o());
      }),
      i("transitionStart", () => {
        t.params.lazy.enabled &&
          (t.params.lazy.loadOnTransitionStart ||
            (!t.params.lazy.loadOnTransitionStart && !n)) &&
          (t.params.lazy.checkInView ? c() : o());
      }),
      i("transitionEnd", () => {
        t.params.lazy.enabled &&
          !t.params.lazy.loadOnTransitionStart &&
          (t.params.lazy.checkInView ? c() : o());
      }),
      i("slideChange", () => {
        const {
          lazy: e,
          cssMode: s,
          watchSlidesProgress: i,
          touchReleaseOnEdges: a,
          resistanceRatio: l,
        } = t.params;
        e.enabled && (s || (i && (a || 0 === l))) && o();
      }),
      Object.assign(t.lazy, { load: o, loadInSlide: r });
  }
  window.addEventListener("load", function (e) {
    document.querySelector(".main-catalog__slider") &&
      new re(".main-catalog__slider", {
        modules: [pe, ue],
        observer: !0,
        observeParents: !0,
        slidesPerView: 5,
        spaceBetween: 0,
        autoHeight: !0,
        speed: 800,
        simulateTouch: !1,
        lazy: !0,
        scrollbar: { el: ".swiper-scrollbar", hide: !1, draggable: !0 },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 0, autoHeight: !0 },
          478: { slidesPerView: 2, spaceBetween: 0, autoHeight: !0 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          992: { slidesPerView: 4, spaceBetween: 20 },
          1268: { slidesPerView: 5, spaceBetween: 30 },
        },
        on: {},
      }),
      document.querySelector(".card__slider") &&
        new re(".card__slider", {
          modules: [de, ue],
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 0,
          autoHeight: !0,
          speed: 800,
          lazy: !0,
          pagination: { el: ".swiper-pagination", clickable: !0 },
          scrollbar: { el: ".swiper-scrollbar", hide: !1 },
          on: {},
        });
  });
  let he = !1;
  setTimeout(() => {
    if (he) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const me = document.querySelector(".header__wrapper"),
    fe = me.offsetTop,
    ge = document.querySelector(".wrapper"),
    ve = document.querySelector("main.page");
  window.addEventListener("scroll", function () {
    const e = window.scrollY;
    if (e > fe) {
      ge.classList.add("header-fixed");
      const e = me.clientHeight;
      ve.style.paddingTop = e + "px";
    } else e < fe && (ge.classList.remove("header-fixed"), (ve.style.paddingTop = 0));
  }),
    document
      .querySelector(".header__btn-close")
      .addEventListener("click", function () {
        (document.querySelector(".header__banner").style.height = "0"),
          (document.querySelector(".header__banner").style.opacity = "0");
      }),
    document.addEventListener("click", function (e) {
      const t = e.target;
      console.log(t),
        (t.classList.contains("search-form__icon") ||
          t.classList.contains("search-form-icon")) &&
          (document.querySelector(".search-form").classList.add("_active"),
          document.querySelector("body").classList.add("_active-search"));
      t.classList.contains("search-form__btn-close") &&
        (document.querySelector(".search-form").classList.remove("_active"),
        document.querySelector("body").classList.remove("_active-search"));
    }),
    document.addEventListener("mouseover", function (e) {
      e.target.classList.contains("menu__link_arrow") &&
        e.target.closest(".menu__item").classList.add("_hover");
    }),
    document.addEventListener("mouseout", function (e) {
      e.target.classList.contains("menu__link_arrow") &&
        e.target.closest(".menu__item").classList.remove("_hover");
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (e) {
        a &&
          e.target.closest(".icon-menu") &&
          (((e = 500) => {
            document.documentElement.classList.contains("lock") ? l(e) : n(e);
          })(),
          document.documentElement.classList.toggle("menu-open"));
      }),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const s = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        s.length && l(s);
        let a = r(e, "spollers");
        function l(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  n(e),
                  e.addEventListener("click", o))
                : (e.classList.remove("_spoller-init"),
                  n(e, !1),
                  e.removeEventListener("click", o));
          });
        }
        function n(e, t = !0) {
          let s = e.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function o(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              a = s.closest("[data-spollers]"),
              l = a.hasAttribute("data-one-spoller"),
              n = a.dataset.spollersSpeed
                ? parseInt(a.dataset.spollersSpeed)
                : 500;
            a.querySelectorAll("._slide").length ||
              (l && !s.classList.contains("_spoller-active") && c(a),
              s.classList.toggle("_spoller-active"),
              i(s.nextElementSibling, n)),
              e.preventDefault();
          }
        }
        function c(e) {
          const s = e.querySelector("[data-spoller]._spoller-active"),
            i = e.dataset.spollersSpeed
              ? parseInt(e.dataset.spollersSpeed)
              : 500;
          s &&
            !e.querySelectorAll("._slide").length &&
            (s.classList.remove("_spoller-active"), t(s.nextElementSibling, i));
        }
        a &&
          a.length &&
          a.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              l(e.itemsArray, e.matchMedia);
            }),
              l(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll("[data-tabs]");
      let i = [];
      if (e.length > 0) {
        const t = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        t && t.startsWith("tab-") && (i = t.replace("tab-", "").split("-")),
          e.forEach((e, t) => {
            e.classList.add("_tab-init"),
              e.setAttribute("data-tabs-index", t),
              e.addEventListener("click", n),
              (function (e) {
                let t = e.querySelectorAll("[data-tabs-titles]>*"),
                  s = e.querySelectorAll("[data-tabs-body]>*");
                const a = e.dataset.tabsIndex,
                  l = i[0] == a;
                if (l) {
                  const t = e.querySelector("[data-tabs-titles]>._tab-active");
                  t && t.classList.remove("_tab-active");
                }
                s.length &&
                  ((s = Array.from(s).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  (t = Array.from(t).filter(
                    (t) => t.closest("[data-tabs]") === e
                  )),
                  s.forEach((e, s) => {
                    t[s].setAttribute("data-tabs-title", ""),
                      e.setAttribute("data-tabs-item", ""),
                      l && s == i[1] && t[s].classList.add("_tab-active"),
                      (e.hidden = !t[s].classList.contains("_tab-active"));
                  }));
              })(e);
          });
        let s = r(e, "tabs");
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              a(e.itemsArray, e.matchMedia);
            }),
              a(e.itemsArray, e.matchMedia);
          });
      }
      function a(e, t) {
        e.forEach((e) => {
          let s = (e = e.item).querySelector("[data-tabs-titles]"),
            i = e.querySelectorAll("[data-tabs-title]"),
            a = e.querySelector("[data-tabs-body]"),
            l = e.querySelectorAll("[data-tabs-item]");
          (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            (l = Array.from(l).filter((t) => t.closest("[data-tabs]") === e)),
            l.forEach((l, n) => {
              t.matches
                ? (a.append(i[n]), a.append(l), e.classList.add("_tab-spoller"))
                : (s.append(i[n]), e.classList.remove("_tab-spoller"));
            });
        });
      }
      function l(e) {
        let i = e.querySelectorAll("[data-tabs-title]"),
          a = e.querySelectorAll("[data-tabs-item]");
        const l = e.dataset.tabsIndex;
        const n = (function (e) {
          if (e.hasAttribute("data-tabs-animate"))
            return e.dataset.tabsAnimate > 0
              ? Number(e.dataset.tabsAnimate)
              : 500;
        })(e);
        if (a.length > 0) {
          const r = e.hasAttribute("data-tabs-hash");
          (a = Array.from(a).filter((t) => t.closest("[data-tabs]") === e)),
            (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === e)),
            a.forEach((e, a) => {
              var o;
              i[a].classList.contains("_tab-active")
                ? (n ? s(e, n) : (e.hidden = !1),
                  r &&
                    !e.closest(".popup") &&
                    ((o = (o = `tab-${l}-${a}`)
                      ? `#${o}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", o)))
                : n
                ? t(e, n)
                : (e.hidden = !0);
            });
        }
      }
      function n(e) {
        const t = e.target;
        if (t.closest("[data-tabs-title]")) {
          const s = t.closest("[data-tabs-title]"),
            i = s.closest("[data-tabs]");
          if (
            !s.classList.contains("_tab-active") &&
            !i.querySelector("._slide")
          ) {
            let e = i.querySelectorAll("[data-tabs-title]._tab-active");
            e.length &&
              (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === i)),
              e.length && e[0].classList.remove("_tab-active"),
              s.classList.add("_tab-active"),
              l(i);
          }
          e.preventDefault();
        }
      }
    })(),
    window.addEventListener("load", function (e) {
      const i = document.querySelectorAll("[data-showmore]");
      let a, l;
      function n(e) {
        e.forEach((e) => {
          o(e.itemsArray, e.matchMedia);
        });
      }
      function o(e, i) {
        e.forEach((e) => {
          !(function (e, i = !1) {
            let a = (e = i ? e.item : e).querySelectorAll(
                "[data-showmore-content]"
              ),
              l = e.querySelectorAll("[data-showmore-button]");
            (a = Array.from(a).filter(
              (t) => t.closest("[data-showmore]") === e
            )[0]),
              (l = Array.from(l).filter(
                (t) => t.closest("[data-showmore]") === e
              )[0]);
            const n = c(e, a);
            (i.matches || !i) &&
            n <
              (function (e) {
                let t,
                  s = e.offsetHeight;
                e.style.removeProperty("height"),
                  e.closest("[hidden]") &&
                    ((t = e.closest("[hidden]")), (t.hidden = !1));
                let i = e.offsetHeight;
                return t && (t.hidden = !0), (e.style.height = `${s}px`), i;
              })(a)
              ? (t(a, 0, n), (l.hidden = !1))
              : (s(a, 0, n), (l.hidden = !0));
          })(e, i);
        });
      }
      function c(e, t) {
        let s = 0;
        if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
          const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
            i = t.children;
          for (
            let t = 1;
            t < i.length && ((s += i[t - 1].offsetHeight), t != e);
            t++
          );
        } else s = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
        return s;
      }
      function d(e) {
        const i = e.target,
          r = e.type;
        if ("click" === r) {
          if (i.closest("[data-showmore-button]")) {
            const e = i
                .closest("[data-showmore-button]")
                .closest("[data-showmore]"),
              a = e.querySelector("[data-showmore-content]"),
              l = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
              n = c(e, a);
            a.classList.contains("_slide") ||
              (e.classList.contains("_showmore-active")
                ? t(a, l, n)
                : s(a, l, n),
              e.classList.toggle("_showmore-active"));
          }
        } else "resize" === r && (a && a.length && o(a), l && l.length && n(l));
      }
      i.length &&
        ((a = Array.from(i).filter(function (e, t, s) {
          return !e.dataset.showmoreMedia;
        })),
        a.length && o(a),
        document.addEventListener("click", d),
        window.addEventListener("resize", d),
        (l = r(i, "showmoreMedia")),
        l &&
          l.length &&
          (l.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              o(e.itemsArray, e.matchMedia);
            });
          }),
          n(l)));
    });
})();
