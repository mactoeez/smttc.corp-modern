document.addEventListener("DOMContentLoaded", function() {
  // Navbar toggle
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  toggleBtn?.addEventListener("click", ()=>{ navMenu.classList.toggle("active"); });

  // Collapse nav on click
  navMenu?.querySelectorAll("a").forEach(link=>{
    link.addEventListener("click", ()=>{ navMenu.classList.remove("active"); });
  });

  // Carousel
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".carousel .slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let index = 0;

  function showSlide(i){ index=(i+slides.length)%slides.length; carousel.style.transform=`translateX(${-index*100}%)`; }
  prevBtn?.addEventListener("click",()=>showSlide(index-1));
  nextBtn?.addEventListener("click",()=>showSlide(index+1));
  setInterval(()=>showSlide(index+1),5000);

  // Modal Zoom
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  document.querySelectorAll(".zoomable").forEach(img=>{
    img.addEventListener("click",()=>{
      modal.style.display="flex";
      modalImg.src=img.src;
      caption.innerText=img.alt;
    });
  });
  closeBtn?.addEventListener("click",()=>modal.style.display="none");
  modal?.addEventListener("click",(e)=>{ if(e.target===modal) modal.style.display="none"; });

  // Contact Form
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit",function(e){
    e.preventDefault();
    const formData = new FormData(form);
    fetch("https://script.google.com/macros/s/AKfycbw5QMJ_nu3qxNtLAa2k4-yhRTR95TOfk6kBKxh7KTA1LjPSkwZrJijHv9aHyfL6lbIk/exec", { method:"POST", body:formData })
      .then(res=>res.text()).then(text=>{
        alert("Your inquiry has been successfully sent to us. We'll get back to you soon"); form.reset();
      }).catch(err=>{ alert("Failed to send message."); console.error(err); });
  });
});
