import Fuse from 'fuse.js'

export default (word, arr, keys) => {
    const options = (fields) => ({
        includeScore: true,
        minMatchCharLength: 3,
        keys: [...fields]
    });

    const fuse = new Fuse(arr, options(keys));

    return fuse.search(word).map(v=>v.item);
}