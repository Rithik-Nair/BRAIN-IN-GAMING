document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menuList = document.querySelector('.navbar ul');
  
    menuIcon.addEventListener('click', function () {
      menuList.style.display = (menuList.style.display === 'none' || menuList.style.display === '') ? 'block' : 'none';
    });
  });
  