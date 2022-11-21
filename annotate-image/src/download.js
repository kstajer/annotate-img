export function download(allAnnotations, annotationsCounted) {
    const getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return (today);
    }

    var input_images = []
    var input_annotations = []
    var input_categories = []
    var input_info = {}
    var image = {}
    var categories = []

    for (let i = 0; i < Object.keys(annotationsCounted).length; i++)
    {
        Object.keys(annotationsCounted[i]).forEach(obj => {
            if (!categories.includes(obj)) {
                categories.push(obj)
            }
        });

    }
    let i = 0
    categories.forEach(c => {
        var category = {
            name: c,
            id: i
        }
        i = i + 1
        input_categories.push(category)
    });

    
    input_info = {
        description: "description_test", 
        url: "http://test.test",
        version: "1.0_test",
        year: 2022,
        contributor: "contributor_test",
        date_created: getCurrentDate()
    }

    allAnnotations.forEach(img => {
        if(img.hasOwnProperty('dimensions')) {
            image = {
                id: img.id,
                width: img.dimensions.width,
                height: img.dimensions.height,
                file_name: img.name
            }
        }
        else {
            image = {
                id: img.id,
                file_name: img.name
            }
        }

        input_images.push(image)
        img.annotations.forEach(ann => {
            var catId
            input_categories.forEach(cat => {
                if (cat.name === ann.data.text) {
                    catId = cat.id
                }
            });
            var annotation = {
                id: ann.data.id,
                image_id: img.id,
                category_id: catId,
                type: ann.geometry.type,
                bbox: [
                    Math.round(ann.geometry.x * img.dimensions.width) / 100, 
                    Math.round(ann.geometry.y * img.dimensions.height) / 100, 
                    Math.round(ann.geometry.width * img.dimensions.width) / 100,
                    Math.round(ann.geometry.height * img.dimensions.height) / 100
                ]
            }
            input_annotations.push(annotation)
        })
    });


    var coco = {
        info: input_info,
        images: input_images,
        annotations: input_annotations,
        categories: input_categories
    }

    return (coco)
}