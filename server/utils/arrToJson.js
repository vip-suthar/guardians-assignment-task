function arrToJson(){
    let titleRow = null;
    return function (arr) {
        let inputArr = [...arr];
        const res = [];
        
        if(!titleRow) {
            titleRow = inputArr[0];
            inputArr.shift();
        }

        for(let i=0;i<inputArr.length;i++) {

            let currRow = inputArr[i];
            let objRow = {};

            for(let j=0;j<currRow.length;j++) {
                objRow[titleRow[j] || (j+"")] = currRow[j];
            }
    
            res.push(objRow);
        }
    
        return res;
    }
}

module.exports = arrToJson;