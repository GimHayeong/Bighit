ko.bindingHandlers.date = {
    init: function (element, valueAccessor, allBindingAccessor, viewModel) {
        $(element).mask("9999/99/99", { placeholder: "yyyy/mm/dd" });
        ko.utils.registerEventHandler(element, "change", () => {
            var value = valueAccessor();
            if (moment(element.value).isValid()) {
                value(element.value);
            } else {
                value(null);
            }
        });
        ko.validation.makeBindingHandlerValidatable("date");
    },
    update: function (element, valueAccessor, allBindingAccessor, viewModel) {
        var value = valueAccessor();
        var allBindings = allBindingAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var pattern = allBindings.format || "yyyy/mm/dd";
        var output = null;

        if (valueUnwrapped != null && valueUnwrapped != undefined && valueUnwrapped.length > 0) {
            output = moment(valueUnwrapped).format(pattern);
        }

        if ($(element).is("input") == true) {
            $(element).val(output);
        } else {
            $(element).text(output);
        }
    }
};
ko.validation.makeBindingHandlerValidatable("date");

ko.validation.rules["simpleDate"] = {
    validator: (val, validate) =>{
        if (val == null) return true;
        return moment(val).isValid();
    },
    message: "Invalid date"
};

ko.observable($("#ReleaseDate").val());

//시작 날짜 선택후, 종료날짜는 시작날짜 이후 선택하도록 설정
//initDateTerm("#datepicker1", "#datepicker2");
function initTerm(startTarget, endTarget) {
    $(startTarget).datepicker({
        numberOfMonths: 2,
        onSelect: function (selected) {
            $(endTarget).datepicker("option", "minDate", selected)
        }
    });
    $(endTarget).datepicker({
        numberOfMonths: 2,
        onSelect: function (selected) {
            $(startTarget).datepicker("option", "maxDate", selected)
        }
    });
}