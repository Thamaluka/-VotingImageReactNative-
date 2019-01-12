import { Buffer } from 'buffer'
const Realm = require('realm');
let realm
const ImageSchema = {
    name: 'CardSchema',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        like: 'int',
        dislike: 'int',
        image: 'data',
    }
};

const databaseOption = {
    path: 'imageList.realm',
    schema: [ImageSchema],
    schemaVersion: 8
}


export const inicializateRealm = () => new Promise(() => {
    Realm.open(databaseOption)
        .then(realm => {
            realm.write(() => {
                realm.create('CardSchema', { id: 1, title: 'React', like: 0, dislike: 0, image: Buffer.from('../assets/reactNative.png') });
                realm.create('CardSchema', { id: 2, title: 'Facebook ', like: 0, dislike: 0, image: Buffer.from('../assets/fb.png') });
                realm.create('CardSchema', { id: 3, title: 'Programing', like: 0, dislike: 0, image: Buffer.from('../assets/code.jpg'), });
            });
        }).catch((error) => {
            console.log("Erro ao Inserir: " + error)
        });
});


export const queryAllList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOption).then(realm => {
        let allList = realm.objects('CardSchema');
        allList.forEach(element => {
            console.log(element.image)
        });
        resolve(allList);
    }).catch((error) => {
        reject(error)
    });
});



export const updateLike = (id, like) => new Promise((resolve) => {
    Realm.open(databaseOption)
        .then(realm => {
            realm.write(() => {
                realm.create('CardSchema', { id: id, like: like, }, true);
            });
            resolve()
        }).catch((error) => {
            console.log("Erro ao Inserir: " + error)
        });
});


export const updateDislike = (id, dislike) => new Promise((resolve) => {
    Realm.open(databaseOption)
        .then(realm => {
            realm.write(() => {
                realm.create('CardSchema', { id: id, dislike: dislike, }, true);
            });
            resolve()
        }).catch((error) => {
            console.log("Erro ao Inserir: " + error)
        });
});


export default new Realm(databaseOption);