let message = null;
let modifiedPicturesQuant = 0;
let originalPicturesQuant = 0;

class Statics{
    
    static get Message() {
        var messageToReturn = message;
        message = null;
        return messageToReturn;
    }
    static set Message(value){
        message = value;
    }

    static get ModifiedPicturesQuant() {
        return modifiedPicturesQuant;
    }
    static set ModifiedPicturesQuant(value){
        modifiedPicturesQuant = value;
    }

    static get OriginalPicturesQuant() {
        return originalPicturesQuant;
    }
    static set OriginalPicturesQuant(value){
        originalPicturesQuant = value;
    }
}

export default Statics;