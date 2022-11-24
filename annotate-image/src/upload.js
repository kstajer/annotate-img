export function upload(inputCoco, allAnnotationsOG) {
    if (inputCoco === '') {
        return null
    }
    var coco = JSON.parse(inputCoco)
    var allAnnotations = []
    var categories = Object.assign({}, ...(coco.categories.map(item => ({ [item.id]: item.name }) )));
    var imagesLoaded = Object.assign({}, ...(allAnnotationsOG.map(item => ({ [item.id]: item.name }) )));
    var max_id = 0

    coco.images.forEach(img => {
        var image = {
            annotations: [],
            id: img.id,
            name: img.file_name,
            dimensions: {height: img.height, width: img.width}
        }
        allAnnotations.push(image)
    });

    allAnnotations.forEach(img => {
        var anns = []
        coco.annotations.forEach(ann => {
            if (ann.image_id === img.id) {
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
    console.log('allAnnotations in upload')
    console.log(allAnnotations)
    // console.log('allAnnotationsOG')
    // console.log(allAnnotationsOG)
    console.log('finish upload.js')
    var result = [allAnnotations, max_id]
    return (result)
}