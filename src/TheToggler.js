(global => {
	const DEFAULT_OPTIONS = {
		activeByDefault: false,
	}

	const TheToggler = (toggler, targets, options) => {
		return new TheToggler.init(toggler, targets, options);
	}

	TheToggler.init = function (toggler, targets, options = {}) {
		this.toggler = typeof toggler === 'string'
			? document.querySelector(toggler)
			: toggler

		this.targets = typeof targets === 'string'
			? [...document.querySelectorAll(targets)]
			: [...targets.map(target => document.querySelector(target))]

		this.initOptions(options);
		this.handleClick();
	}

	TheToggler.prototype = {
		options: DEFAULT_OPTIONS,
		isActive: false,
		debounceID: undefined,
	}

	TheToggler.prototype.handleClick = function () {
		this.toggler.addEventListener('click', () => {
			this.toggleActive()
		})
	}

	TheToggler.prototype.toggleActive = function () {
		[this.toggler, ...this.targets].map(el => {
			this.isActive
				? el.setAttribute('data-active', '')
				: el.removeAttribute('data-active', '')
		})

		this.isActive = !this.isActive
	}

	TheToggler.prototype.initOptions = function (options) {
		for (let key in DEFAULT_OPTIONS) {
			if (options.hasOwnProperty(key))
				this.options[key] = options[key];
		}

		this.isActive = this.options.activeByDefault

		if (this.options.activeByDefault)
			this.toggleActive()
	}

	const debounce = function (id, fn, delay) {
		clearTimeout(id)
		id = setTimeout(fn, delay)
	}
	TheToggler.init.prototype = TheToggler.prototype;
	global.TheToggler = TheToggler;
})(window)