export function upload(inputCoco, allAnnotationsOG) {
    if (inputCoco === '') {
        return null
    }

    var coco = JSON.parse(inputCoco)
    var allAnnotations = []
    var categories = Object.assign({}, ...(coco.categories.map(item => ({ [item.id]: item.name }))));
    var imagesLoaded = Object.assign({}, ...(allAnnotationsOG.map(item => ({ [item.id]: item.name }))));
    var imagesArray = []
    var max_id = 0
    var img_id = 0

    coco.images.forEach(img => {
        if (Object.values(imagesLoaded).includes(img.file_name)) {
            var image = {
                annotations: [],
                id: img_id,
                name: img.file_name,
                dimensions: { height: img.height, width: img.width }
            }
            img_id = img_id + 1
            imagesArray.push({ id: img.id, name: img.file_name })
            allAnnotations.push(image)
        }
    });

    var imagesFromCoco = Object.assign({}, ...(imagesArray.map(item => ({ [item.id]: item.name }))));

    allAnnotations.forEach(img => {
        var anns = []
        coco.annotations.forEach(ann => {
            if ((imagesFromCoco[ann.image_id] === img.name)) {
                console.log(imagesLoaded[ann.image_id])
                console.log(img.name)
                var a = {
                    data: {
                        id: ann.id,
                        text: categories[ann.category_id]
                    },
                    geometry: {
                        type: ann.type,
                        x: (ann.bbox[0] / img.dimensions.width) * 100,
                        y: (ann.bbox[1] / img.dimensions.height) * 100,
                        width: (ann.bbox[2] / img.dimensions.width) * 100,
                        height: (ann.bbox[3] / img.dimensions.height) * 100
                    }
                }
                if (ann.id > max_id) {
                    max_id = ann.id
                }
                anns.push(a)
            }
        });
        img.annotations = anns

    });
    var result = [allAnnotations, max_id]
    return (result)
}