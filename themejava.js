function changeTheme(){
    const themeSelect = document.getElementById('themeSelect');
    const themeStyleSheet = document.getElementById('themeStyleSheet');
    
    themeSelect.addEventListener('change', function(){
        themeStyleSheet.setAttribute('href', this.value + ".css");
    })};