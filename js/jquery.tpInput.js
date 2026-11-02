/**
 * Created by hewenlin on 2016/5/20.
 * use in login.htm
 * add tpPassword's function on 2016/10/14.
 */
(function($) {
    function tpInput(id, options) {
        this.element = $('#' + id);
        this.options = $.extend({}, tpInput.prototype.options, options);
        this._create(options);
        if ($.isFunction(this._init)) {
            this.init();
        }
    }

    tpInput.prototype = {
        constructor: tpInput,
        options: {
            placeholder: null,
            isPassword: null,
            disableChange: true,
            visible: false,
            classFocus: 'focus',
            classVisible: 'visible',
            classInvisible: 'invisible',
            textLabel: null,
            textLabelClass: '',
            textLabelConnector: ':',
            parentClass: 'pure-control-group',
            borderRadius: true,
            readOnly: false,
            vtype: null,
            vtypeText: null,
            allowBlank: true,
            blankText: null,
            validator: null,
            invalidText: null,
            bubbleError: false,
            suffix: null,
            underHint: null, //显示在文本框底部的提示，只要错误提示不显示就会一直显示
            clickHideError: false //点击任意地方隐藏错误提示
        },
        _create: function() {
            var isIE11 = (/Trident\/7\./).test(navigator.userAgent);

            this.id = this.element.attr('id');
            this.element.addClass('tpInput');
            this.options.readOnly = this.options.readOnly || this.element.prop('readOnly');
            if (this.options.readOnly) {
                this.element.prop('readOnly', true);
            }
            if (this.options.textLabel || this.options.textLabel == '' || this.element.prev('b').length > 0) {
                var tmpB = this.element.prev('b');
                var id = this.element.id + '-textLabel';
                if (tmpB.length > 0) {
                    this.options.textLabel = this.options.textLabel || tmpB.text();
                    this.options.textLabelClass += ' ' + tmpB.attr('class');
                    id = tmpB.attr('id') || id;
                    this.element.prev('b').remove();
                }
                this.textLabel = $('<label class="label-title">' + this.options.textLabel + '</label>')
                    .addClass(this.options.textLabelClass)
                    .attr('id', id)
                    .insertBefore(this.element)
                    .after(' ');
            }

            if (this.options.parentClass !== null) {
                this.element.parent('div').addClass(this.options.parentClass);
            }

            if (this.element.parent('.input-container').length == 0) {
                this.element.wrap('<div class="input-container"></div>');
            }
            this.container = this.element.parent('.input-container'); //全控件的包裹层
            this.element.wrap('<div class="input-wrapper"></div>'); //边框层
            this.wrapper = this.element.parent('.input-wrapper');
            if (isIE11 && (this.id == "dyndns_pwd" || this.id == "noip_pwd" || this.id == "pc-setPwd-new" || this.id == "pc-setPwd-confirm")) {
                this.wrapper.css({
                    width: "186px",
                    height: "32px"
                });
            } else {
                this.wrapper.css({
                    width: this.element.css('width'),
                    height: this.element.css('height')
                });
            }
            this.options.placeholder = this.options.placeholder || this.element.attr('placeholder');

            if (this.options.placeholder) {
                this.hint = $('<label class="input-placeholder" for="' + this.id + '"></label>').appendTo(this.container).css({
                    left: this.element.css('paddingLeft'),
                    height: this.element.css('height'),
                    lineHeight: this.element.css('height')
                }).show();
                this._setOption('placeholder', this.options.placeholder);
            }


            this.options.isPassword = (this.options.isPassword !== null ? this.options.isPassword : this.element.is(':password'));
            if (this.options.isPassword) {
                this.container.addClass('tpPassword');
                this.vInput = $('<input type="text">').appendTo(this.wrapper)
                    .attr('maxlength', this.element.attr('maxlength'))
                    .attr('id', this.id + '_v')
                    .prop('disabled', this.element.prop('disabled'))
                    .addClass(this.element.attr('class'))
                    .hide();

                this.visible = this.options.visible || (this.element.attr('data-visible') == "true" ? true : false);
                this._setOption('visible', this.visible);

                this.eyeIcon = $('<span class="icon-eye"></span>').appendTo(this.wrapper);
            }

            if (this.options.bubbleError === true) {
                this.error = $('<div class="input-err-container">' +
                    ' <div class="shadow-top-left"></div>' +
                    '<div class="shadow-top"></div>' +
                    '<div class="shadow-top-right"></div>' +
                    '<div class="shadow-left">' +
                    '<div class="shadow-right">' +
                    '<span class="input-err-delta"></span><div class="input-err-content"><span class="text"></span></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="shadow-bot-left"></div>' +
                    '<div class="shadow-bot"></div>' +
                    '<div class="shadow-bot-right"></div>' +
                    '</div>').appendTo(this.container);
            } else {
                this.error = $('<div class="input-err-container">' +
                    '<span class="widget-err icon-err"></span><span class="text"></span>' +
                    '</div>').appendTo(this.container);
            }
            if (this.options.underHint) {
                this.underHint = $('<div class="input-under-hint-container">' +
                    '<span class="text"></span>' +
                    '</div>').appendTo(this.container);

                this.showUnderHint();
            }

            if (this.options.borderRadius === true) {
                this.wrapper.append('<span class="corner-left"></span><span class="corner-right"></span>');
            }

            if (this.options.suffix) {
                this.suffix = $('<span class="input-suffix">' + this.options.suffix + '</span>').insertAfter(this.container);
            }
            //            var isIE8 = ( navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" );
            //            if (isIE8 && this.options.placeholder && this.element.val() == '') {
            //                this.hint.show()
            //            }

            if (this.options.vtype) {
                this._setOption('vtype', this.options.vtype);
            }

            this._registerHandler();
        },

        _registerHandler: function() {
            var me = this;
            //            var isIE8 = ( navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" );

            this.container.on('blur.tpInput', 'input[type=password], input[type=text]', function() {
                me.container.removeClass(me.options.classFocus);
                if (!me.options.isPassword && me.element.val() == '' ||
                    me.options.isPassword && me.visible == false && me.element.val() == '' ||
                    me.options.isPassword && me.visible == true && me.vInput.val() == '') {
                    me.hint && me.hint.show();
                }

                setTimeout(function() {
                    if (!me.container.hasClass(me.options.classFocus)) {
                        me.validate();
                    }
                }, 100);

            });


            //获取焦点时，根据输入框当前的值显示相关选项
            this.container.on('focus.tpInput', 'input[type=password], input[type=text]', function() {
                if (!me.container.hasClass('disabled') && !me.options.readOnly) {
                    me.container.addClass(me.options.classFocus);
                    me.hint && me.hint.hide();
                }
                me.hideError(!me.container.hasClass('disabled') && !me.options.readOnly);
                me.error.hide();

                me.element.trigger('ev_focus');
            });

            if (this.options.isPassword) {
                //当点击眼睛图标时，切换显示隐藏，同步两框的值
                $(this.container).on('click.tpPassword', '.icon-eye', function() {
                    if (me.container.hasClass('disabled') && me.options.disableChange === false) {
                        return;
                    }
                    //					me.container.addClass(me.options.classFocus);
                    if (me.visible === true) {
                        me._setOption('visible', false);
                        //set try catch to fixed bug in ie8
                        try {
                            me.element.val(me.vInput.val()).focus();
                        } catch (e) {}
                    } else {
                        me._setOption('visible', true);
                        try {
                            me.vInput.val(me.element.val()).focus();
                        } catch (e) {}
                        me.disabled(me.element.prop('disabled'));
                    }
                });

                //为支持web端直接通过password来获取值，失去焦点时，同步两框值
                $(this.container).on('blur.tpPassword', 'input[type=password], input[type=text]', function() {
                    if (me.visible === true) {
                        me.element.val(me.vInput.val());
                    } else {
                        me.vInput.val(me.element.val());
                    }
                });

                //主要用于适配页面上通过js调用原元素focus
                $(this.element).on('focus.tpPassword', function() {
                    if (me.visible === true) {
                        me.vInput.show().focus();
                    }
                });
                $(this.vInput).on('keydown.tpPassword keyup.tpPassword', function(e) {
                    e.stopPropagation();
                    me.element.trigger(e.type);
                });

                $(this.element).on('keydown', function(e) {
                    if (e.keyCode == 0xD) {
                        e.preventDefault();
                    }
                });
            }
        },

        _unregisterHandlers: function() {
            this.element.off('.tpInput .tpPassword');
        },

        _setOption: function(key, value) {
            if (key == 'placeholder') {
                if (value !== null && value !== undefined) {
                    this.hint.text(value);
                }
            } else if (key == 'value') {
                this.val(value);
            } else if (key == 'disabled') {
                this.disabled(value);
            } else if (key == 'visible') {
                if (value == true) {
                    this.visible = true;
                    this.container.addClass(this.options.classVisible).removeClass(this.options.classInvisible);
                    this.vInput.show();
                    this.element.hide();
                    this.hint && this.hint.attr('for', this.vInput.attr('id'));
                } else {
                    this.visible = false;
                    this.container.addClass(this.options.classInvisible).removeClass(this.options.classVisible);
                    this.vInput.hide();
                    this.element.show();
                    this.hint && this.hint.attr('for', this.element.attr('id'));
                }
            } else if (key == 'vtype') {
                this.options.vtype = new $.su.vtype(value);
            } else if (key == 'underHint') {
                this.options.underHint = value;
                this.showUnderHint();
            }
        },

        showUnderHint: function(text) {
            if (!this.options.underHint) {
                return;
            }
            text = text || this.options.underHint;
            if ($.isFunction(text)) {
                text = text();
            }
            this.underHint.show().find('span.text').text(text);
            this.container.parent('.pure-control-group').addClass('hint');
        },
        hideUnderHint: function() {
            if (!this.options.underHint) {
                return;
            }
            this.underHint.hide();
            if (this.container.parent('.pure-control-group').find('.input-hint-container:visible').length == 0) {
                this.container.parent('.pure-control-group').removeClass('hint');
            }
        },
        showError: function(text) {
            this.error.show().find('span.text').text(text);
            this.container.addClass('err');
            if (this.options.bubbleError == false) {
                this.container.parent('.pure-control-group').addClass('err');
            }
            var me = this;
            if (me.options.clickHideError) {
                $(window).one('click', function() {
                    me.hideError(false);
                });
            }

            this.hideUnderHint();
        },

        hideError: function(removeBorder) {
            this.error.hide();
            if (removeBorder !== false) {
                this.container.removeClass('err');
            }
            if (this.options.bubbleError == false && this.container.parent('.pure-control-group').find('.input-container.err').length == 0) {
                this.container.parent('.pure-control-group').removeClass('err');
            }

            this.showUnderHint();
        },

        disabled: function(flag) {
            if (flag === true) {
                this.container.addClass('disabled');
            } else {
                this.container.removeClass('disabled');
            }
            this.element.prop('disabled', flag);
            if (this.options.isPassword) {
                this.vInput.prop('disabled', flag);
            }

        },

        val: function(val) {
            if (val !== undefined) {
                this.element.val(val);
                if (this.options.isPassword) {
                    this.vInput.val(val);
                }

                this.validate();
            }
            if (this.options.isPassword && this.visible === true) {
                return this.vInput.val();
            } else {
                return this.element.val();
            }
        },

        focus: function() {
            if (this.options.isPassword && this.visible == true) {
                this.vInput.focus();
            } else {
                this.element.focus();
            }
        },

        validate: function(isShowed) {
            var me = this;
            var value = this.val();
            var errText;

            if (value === "") {
                //空白验证
                if (me.options.allowBlank !== true) {
                    errText = this.options.blankText || $.tpLang.VTYPETEXT.BLANKTEXT;
                    if (isShowed !== false) {
                        me.showError(errText);
                    }
                    return errText;
                }
            } else {
                //vtype验证
                var vtype = me.options.vtype;
                if (vtype && vtype.isVtype === true) {
                    errText = vtype.validate(value);

                    if (errText !== true) {
                        if (errText === false) {
                            errText = me.options.vtypeText;
                        }

                        if (isShowed !== false) {
                            me.showError(errText);
                        }

                        return errText;
                    }
                }

                //validator验证
                if (me.options.validator) {
                    errText = me.options.validator(value);
                    if (errText !== true) {
                        if (errText === false) {
                            errText = me.options.invalidText || $.tpLang.VTYPETEXT.INVALIDTEXT;
                        }

                        if (isShowed !== false) {
                            me.showError(errText);
                        }

                        return errText;
                    }
                }
            }
            me.hideError();
            return true;
        },

        _destroy: function() {
            this._unregisterHandlers();
            this.error.remove();
            this.hint.remove();
            if (this.options.isPassword) {
                this.vInput.remove();
                this.eyeIcon.remove();
            }
            this.element.unwrap().unwrap();
        }

    };

    $.fn.tpInput = function(options) {
        var arg = arguments;
        var result;
        this.each(function() {
            var input = $(this).data('tpInput');
            if (!input && options != 'destroy') {
                var instance = new tpInput(this.id, options);
                $(this).data('tpInput', instance);
            } else if (options == 'option') {
                result = input._setOption.apply(input, Array.prototype.slice.call(arg, 1));
            } else if (options == 'destroy') {
                result = input._destroy();
                $(this).removeData('tpInput');
            } else if ($.isFunction(input[options])) {
                result = input[options].apply(input, Array.prototype.slice.call(arg, 1));
            }
        });
        return result;
    };
    $.fn.tpPassword = $.fn.tpInput;
})(jQuery);