import './phone_number_input.scss';

function Phone_number_input({num_value}) {
    const isNumericInput = (e) => {
        const key = e.keyCode;
        return ((key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)
        );
    };

    const isModifierKey = (e) => {
        const key = e.keyCode;
        return (e.shiftKey === true || key === 35 || key === 36) ||
            (key === 8 || key === 9 || key === 13 || key === 46) ||
            (key > 36 && key < 41) ||
            (

                (e.ctrlKey === true || e.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (e) => {
        if (!isNumericInput(e) && !isModifierKey(e)) {
            e.preventDefault();
        }
    };

    const formatToPhone = (e) => {
        if (isModifierKey(e)) { return; }

        const input = e.target.value.replace(/\D/g, '').substring(0, 10);
        const areaCode = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if (input.length > 6) { e.target.value = `(${areaCode}) ${middle} - ${last}`; }
        else if (input.length > 3) { e.target.value = `(${areaCode}) ${middle}`; }
        else if (input.length > 0) { e.target.value = `(${areaCode}`; }
        num_value(e.target.value);
    };
    return (
        <div>
            <input id="phoneNumber" onKeyDown={enforceFormat} onKeyUp={formatToPhone} maxLength="16" required/>
        </div>
    );
}

export default Phone_number_input;