// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
             console.log('printing self attr', self)
             console.log('reached base1');
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                
                type: 'POST',
                url: $(self).attr('href'),
            })
            
            .done(function(data) {
                console.log('reached base2')
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }
                console.log('reached base3')

                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
                console.log(errData);
            });
            

        });
    }
}
