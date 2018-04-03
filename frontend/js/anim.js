function mouseLeaveSidebarCog(link) {
    setTimeout(function() {
        link.innerHTML = '<span style="text-align: center;" class="fas fa-cog"></span>';
    }, 2000);
}

function mouseOverSidebarCog(link) {
    if (link.getElementsByTagName("span")[0].className !== "fas fa-cog fa-spin") {
        link.innerHTML = '<span style="text-align: center;" class="fas fa-cog fa-spin"></span>';
    }
}

function mouseLeaveDeleteButton(link) {
    link.getElementsByTagName("span")[0].className = "fas fa-times fa-lg";
}

function mouseOverDeleteButton(link) {
    link.getElementsByTagName("span")[0].className = "fas fa-times-circle fa-lg";
}