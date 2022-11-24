export function upload(inputCoco) {
    var coco = JSON.parse(inputCoco)
    var allAnnotations = []
    var categories = Object.assign({}, ...(coco.categories.map(item => ({ [item.name]: item.id }) )));

    coco.images.forEach(img => {
        var image = {
            annotations: [],
            id: img.id,
            name: img.file_name,
            dimensions: {height: img.height, width: img.width}
        }
        allAnnotations.push(image)
    });

    console.log(newObj)
    console.log(coco.annotations)
}