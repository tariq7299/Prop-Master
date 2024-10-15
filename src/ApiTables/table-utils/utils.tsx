import { toast } from '@/components/ui/use-toast'


export const copyToClipboard = (value: any, noToast?: any, msg?: any) => {
    navigator.clipboard.writeText(value).then(function () {
        console.log('');
    }).catch(function (err) {
        console.error('Failed to copy text: ', err);
    })
    if (!noToast) {
        toast({
            description: msg || 'تم النسخ',
            variant: "success"
        });
    }
};


// TRUNCATE LONG STRINGS ONLY FROM ONE SIDE
export function truncateStart(fullStr: any, strLen: any, separator?: any) {
    if (fullStr?.length <= strLen) return fullStr;
    separator = separator || '...';
    let charsToShow = strLen,
        frontChars = Math.ceil(charsToShow);
    return fullStr?.substr(0, frontChars) + separator;
}


export function replaceObjects(largeArr: any, smallArr: any) {
    if (largeArr && smallArr) {
        return smallArr.forEach((smallObj: any) => {
            const index = largeArr?.findIndex((largeObj: any) => largeObj?.id === smallObj?.id);
            if (index !== -1) {
                largeArr[index] = { ...largeArr[index], ...smallObj };
            }
        });
    }
}


export function toggleColumnVisibility(value: any, name: any, visibleCols: any, LSKey: any, callback: any) {
    let columns = [...visibleCols];
    if (value === true) {
        columns = [...visibleCols, name];
    } else {
        columns = columns.filter((col) => col !== name);
    }
    callback(columns);
    localStorage.setItem(LSKey, JSON.stringify(columns));
}


export function formatDateNoTime(timestamp: any) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


export function objectToArrayValue(obj: any) {
    return obj ? Object.keys(obj).map((key) => obj[key]) : []
}

export function objectToArrayKey(obj: any) {
    return obj ? Object.keys(obj).map((key) => key) : []
}

export function objectToArrayKeyVal(obj: any) {
    return obj ? Object.keys(obj).map((key) => ({
        key: obj[key],
        value: key
    })) : []
}


export function downloadURL(url: any, name: any) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}`;
    document.body.appendChild(link);
    link.setAttribute('target', '_blank')
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
};


export function getIntersectedRowActions(arrayOfObjects: any) {
    if (arrayOfObjects.length === 0) return {};

    // Initialize the result object with the keys from the first object
    const result: any = {};

    // Iterate over each key in the first object
    for (const key in arrayOfObjects[0]) {
        const actionKey = arrayOfObjects[0][key].action_key;

        // Check if this action_key exists in every object in the array
        const isCommon = arrayOfObjects.every((obj: any) => obj[key] && obj[key].action_key === actionKey);

        // If it exists in all objects, add it to the result
        if (isCommon) {
            result[key] = arrayOfObjects[0][key];
        }
    }

    return result;
}


export function validatePhoneNumber(number: any) {
    if (Number(number[0]) !== 5) {
        return 'رقم الجوال يجب أن يبدأ بالرقم 5'
    }
}


export function preventTyping(chars: any) {
    const inputEls = document.querySelectorAll('.limited-chars')

    function limitChars(event: any, inputEl: any) {
        const inputValue = inputEl.value.trim();
        const labelEl = inputEl.nextElementSibling.nextElementSibling

        let key = event.keyCode;
        if (key === 32) {
            event.preventDefault();
        }

        if (!/^\d*$/.test(inputValue)) {
            // If the input contains non-digit characters, remove them
            inputEl.value = inputValue.replace(/\D/g, '');
        }


        if (inputValue.length === chars) {
            labelEl.classList.add('d-block');
        }

        if (inputValue.length >= chars) {
            event.preventDefault()
        } else if (inputValue.length === chars) {
            labelEl.classList.add('d-block');
        } else {
            labelEl.classList.remove('d-block');
        }
    }

    inputEls.forEach(function (inputEl) {
        inputEl.addEventListener('input', function (event) {
            limitChars(event, inputEl)
        })
        inputEl.addEventListener('keypress', function (event) {
            limitChars(event, inputEl)
        })
        inputEl.addEventListener('paste', function (event) {
            limitChars(event, inputEl)
        })
        inputEl.addEventListener('keyup', function (event) {
            limitChars(event, inputEl)
        })
    })
}

export function transformObject(input: any) {
    const result = { ...input };

    // Iterate over the keys in the input object
    Object.keys(input).forEach(key => {
        if (key.endsWith('_operator')) {
            // Extract the base key without '_operator'
            const baseKey = key.replace('_operator', '');

            // Check if the base key exists in the result object
            if (result[baseKey]) {
                // Add the operator value to the base key object
                result[baseKey].operator = input[key].value;

                // Optionally, remove the '_operator' key if no longer needed
                delete result[key];
            }
        }
    });

    return result;
}

export function filterOutOperatorKeys(input: any) {
    const result: any = {};

    // Iterate over the keys in the input object
    Object.keys(input).forEach(key => {
        // Exclude keys that contain '_operator'
        if (!key.includes('_operator')) {
            result[key] = input[key];
        }
    });

    return result;
}

export function restructureSelectedFilters(data: any, dirtyFields: any, structureFilters: any) {

    const submittedData = objectToArrayKey(dirtyFields)

    const filteredObject = Object.fromEntries(Object.entries(data)?.filter(([key, value]: any) => {

        return typeof value?.fieldValue === 'string' ? submittedData?.includes(key) && value?.fieldValue.trim() !== '' && value?.fieldValue : submittedData?.includes(key) && value?.fieldValue !== '' && value?.fieldValue
    })
    );
    const renderedFilters = Object.keys(filteredObject)?.map((key: any) => {

        const targetFilter = structureFilters?.find((filter: any) => filter?.filter_name === key);

        return {
            key: key,
            value: targetFilter?.type === 'date' ? { from: filteredObject[key]?.fieldValue.from.getTime(), to: filteredObject[key]?.fieldValue.to.getTime() } : filteredObject[key]?.fieldValue,
            label: targetFilter?.label,
            type: targetFilter?.type,
            valueLable: targetFilter?.props?.select_options ? targetFilter?.props?.select_options[filteredObject[key]?.fieldValue] : filteredObject[key]?.fieldValue,
            operator: targetFilter?.type === 'date' ? targetFilter?.props?.operators[0] : filteredObject[key]?.operator,
            props: targetFilter?.props
        }
    })

    return renderedFilters
}


export function getOperatorLabel(operator: any) {
    if (operator === '=') {
        return 'Exact Matching'
    }
    if (operator === 'like') {
        return 'Similar Values'
    }
    if (operator === '>=') {
        return 'Equal to or bigger than'
    }
    if (operator === '<=') {
        return 'Equal to or less than'
    }
}

export function handleNoColumnActionElement(action: any) {
    if (action === 'bank_account') {
        return (
            <span className=''>Not Active(BADGE)</span>
        )
    }
    return '-'
}
