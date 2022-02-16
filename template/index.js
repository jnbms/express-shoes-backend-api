
// const colorInput = document.getElementsByClassName('color-input')[0];
function addColor(){
    console.log('add color');
    // console.log(btoa('../public/images/shoes/shoe1.jpeg'))
}

function designerSubmit() {
    const form = window.designerForm
    const input = document.getElementById('designerInput');
    if(input.value.length == 0) {
        alert('디자이너 이름을 적지 않았습니다.')
    } else {
        // console.log(input.name + " 입니다.")
        form.submit();
    }
}


function submitShoesForm() {
    const form = window.shoesForm
    let checked = 0;
    let colors = 0;
    // console.log(form.getElementsByTagName("input"))
    for(input of form.getElementsByTagName("input")) {
        // console.log(input.type)
        switch(input.type) {
            case "text" :
                // console.log("이름 : " + input.name)
                if(input.name == "name" && input.value == "") {
                    alert('제품명이 작성되지 않았습니다.');
                    return false;
                }
                if(input.name != "name" && input.value != "") {
                    colors += 1;
                }
                break;
            case "number" :
                if(input.value == ""){
                    alert('가격이 등록되지 않았습니다.')
                    return false;
                }
                break;
            case "file" :
                if(input.value == ""){
                    alert('이미지 파일이 등록되지 않았습니다.')
                    return false;
                }
                break;

            case "checkbox": 
                if(input.checked == true) checked += 1;
                break;
        }
    }
    if(checked == 0) {
        alert('치수가 하나 이상 체크되어야 합니다.');
        return false;
    }
    if (colors == 0 ) {
        alert('컬러가 하나 이상 등록되어야 합니다.');
        return false;
    }
    if(confirm('등록하시겠습니까?')) {
        form.submit();
    }
}


// const allShoes = await fetch(process.env.ROOT_URL + '/shoes')
//     .then(
//         res => {
//             console.log('sending data is ' + res)
//             return JSON.stringify(res.json())
//         }
//     )
//     .then(() => {

//         var table = document.getElementsByClassName['table'][0]
//         table.appendChild('p')
//     }
//     )

let selectDesignerId = 0;

function selectDesigner(e) {
    var text = e.innerText;
    var input = document.getElementById('designerInput');
    input.value = text;
    
    var elses = document.getElementsByClassName('selectedDesigner');
    for( tag of elses) {
        tag.style.backgroundColor = "white";
    }
    e.style.backgroundColor = 'gray'

    selectDesignerId = e.id;
}

function updataDesigner() {
    var form = window.designerForm;
    if(selectDesignerId == 0) alert('디자이너가 선택되지 않았습니다.');
    else form.action = `/designer/update/${selectDesignerId}`;
    // form.action = `/designer/update/1`;
    // form.submit();
}

function deleteDesigner() {
    var form = window.designerForm;
    if(selectDesignerId == 0) alert('디자이너가 선택되지 않았습니다.');
    else form.action = `/designer/delete/${selectDesignerId}`;
}

let selectShoesId = 0;
let selectShoesName = "";
function selectShoes(e) {
    var elses = document.getElementsByClassName('selectedShoes');
    for( tag of elses) {
        tag.style.backgroundColor = "white";
    }
    e.style.backgroundColor = 'gray'

    selectShoesId = e.id;
    selectShoesName = document.getElementById('shoesName').innerText;
    console.log(selectShoesName);
}

function removeAllShoesText() {
    const form = window.shoesForm
    const inputs = form.getElementsByTagName('input');
    // inputs.map(input => input.value = false);
    for(input of inputs){
        input.checked = false;
        input.value = null;
    }
    const textarea = form.getElementsByTagName('textarea')[0].value = null;
}

function updateShoes() {
    const form = window.shoesForm;
    if(selectShoesId == 0) alert('신발이 선택되지 않았습니다.');
    else {
        form.action = `/shoes/update/${selectShoesId}?name=${selectShoesName}`
        form.submit();
    }
}

function removeShoes() {
    const form = window.shoesForm;
    if(selectShoesId == 0) alert('신발이 선택되지 않았습니다.');
    else {
        form.action = `/shoes/delete?id=${selectShoesId}&name=${selectShoesName}`;
        form.submit();
    }
}