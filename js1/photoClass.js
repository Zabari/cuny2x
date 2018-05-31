<script type="text/javascript">
Photo= function(filename,location){
        this.fname=filename;
        this.loc=location;
};
Photo.prototype.getFilename=function(){
    return this.fname;
};
Photo.prototype.getLocation=function(){
    return this.location;
};
Album= function(filename,location){
    this.photos=[];
};
Album.prototype.getPhotoByNumber=function(num){
    if (this.photos[num]){
        return this.photos[num];
    }
    else{
        return "This number photo is not available."
    }
};
Album.prototype.AddPhoto=function(photo){
    this.photos.push(photo);
    return;
};
Album.prototype.ListPhotos=function(photo){
    var i=0;
    var ret="";
    for (i=0;i<this.photos.length;i++){
        ret+=this.photos[i].getFilename()+"\n";
    }
    return ret;
};
</script>
