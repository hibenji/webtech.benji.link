document.querySelector('#button').addEventListener('click',function (event){

    // isnt actually needed
    if (event.currentTarget != event.target) return;

    console.log("inner:");
    console.log("target: "+event.target);
    console.log("currentTarget: "+event.currentTarget);
    console.log("thist: "+this);
});

document.querySelector('#outerArea').addEventListener('click',function (event){

    // This is the change:
    if (event.currentTarget != event.target) return;

    console.log("outer:");
    console.log("target: " + event.target);
    console.log("currentTarget: " + event.currentTarget);
    console.log("thist: " + this);
});