
// const colorInput = document.getElementsByClassName('color-input')[0];
function addColor(){
    console.log('add color');
    // console.log(btoa('../public/images/shoes/shoe1.jpeg'))
}

function designerSubmit() {
    const form = window.designerForm
    const input = document.getElementById('designerInput');
    const file = document.getElementById('designerImage');
    if(input.value.length == 0) {
        alert('디자이너 이름을 적지 않았습니다.')
    } else if(file.value == "") {
        alert('파일을 등록하지 않았습니다.')
    } else {
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
let sleectDesignerName = "";

function selectDesigner(e) {
    var texts = e.children[0].children
    var inputs = [
        document.getElementById('designerInput'),
        document.getElementById('slogan'),
        document.getElementById('coment'),
    ]
    inputs.map((input, index) => input.value = texts[index].innerText)
    
    var elses = document.getElementsByClassName('selectedDesigner');
    for( tag of elses) {
        tag.style.backgroundColor = "white";
    }
    e.style.backgroundColor = 'gray'

    sleectDesignerName= e.children[0].children[0].innerText;
    selectDesignerId = e.id;
}

function updataDesigner() {
    var form = window.designerForm;
    var file = document.getElementById('designerImage');
    if(selectDesignerId == 0) alert('디자이너가 선택되지 않았습니다.');
    // else if(file.value =="") alert('파일이 선택되지 않았습니다.')
    else {
        form.action = `/designer/update/${selectDesignerId}?oldname=${sleectDesignerName}`;
        form.submit();
    }
    // form.action = `/designer/update/1`;
    // form.submit();
}

function deleteDesigner() {
    var form = window.designerForm;
    if(selectDesignerId == 0) alert('디자이너가 선택되지 않았습니다.');
    else {
        form.action = `/designer/delete/${selectDesignerId}?oldname=${sleectDesignerName}`;
        form.submit();
    }
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