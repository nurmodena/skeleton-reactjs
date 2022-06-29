const { $ } = window;

const Select2Checkbox = item => $(
    `<div class="icheck-warning d-inline">
        <input id="checkbox-${item.id}" type="checkbox" ${item.selected ? "checked" : ""}>
        <label for="checkbox-${item.id}">${item.text}</label>
    </div>`);

export default Select2Checkbox;
