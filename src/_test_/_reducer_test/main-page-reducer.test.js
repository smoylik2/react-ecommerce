import mainPageReducer, * as all from "../../redux/main-page-reducer";

const prodList = [
    {
    "_id": "5f8f516dce18fbfe69ab6794",
    "id": "830201100",
    "catId": "345",
    "name": "Аккумулятор Patriot BL 404",
    "price": 6883.8,
    "pic": "830201100.jpg"
},
    {
        "_id": "5f8f516dce18fbfe69ab67a4",
        "id": "830201160",
        "catId": "345",
        "name": "Зарядное устройство Patriot GL 405",
        "price": 3542,
        "pic": "830201160.jpg"
    }
    ];

describe( 'Set products list: ', ()=>{
    let result = mainPageReducer(null, all.createSetProductsListAction(prodList));
    test('check products list length', ()=>{
        expect(result.productsList.length)
            .toBe(2)
    });
    test('check equal after prepare data', ()=>{
        expect(result.productsList)
            .toEqual(all._prepareData(prodList))
    })
});