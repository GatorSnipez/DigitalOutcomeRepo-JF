function changeTheme(){
    const themeSelect = document.getElementById('theme_select');
    const themeStyleSheet = document.getElementById('themeStyleSheet');
    
    themeSelect.addEventListener('change', function(){
        themeStyleSheet.setAttribute('href', "css/" + this.value + ".css");
    })};