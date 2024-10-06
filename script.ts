
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeAddress = document.getElementById("resumeAddress") as HTMLParagraphElement;
const resumeLinkedin = document.getElementById("resumeLinkedin") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById("resumeWorkExperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;


form.addEventListener("submit", async(event:Event)=>{
    event.preventDefault()


    const educationGroups = document.querySelectorAll('.education-group');
    let educationHTML = '';

    educationGroups.forEach((group, index) => {
        const degree = (group.querySelector(`#degree-${index + 1}`) as HTMLInputElement).value;
        const institute = (group.querySelector(`#institute-${index + 1}`) as HTMLInputElement).value;
        const year = (group.querySelector(`#year-${index + 1}`) as HTMLInputElement).value;

        educationHTML += `
            <div class="education-entry">
                <p><strong>Degree:</strong> ${degree}</p>
                <p><strong>Institute:</strong> ${institute}</p>
                <p><strong>Year:</strong> ${year}</p><br>
            </div>`;
    });


    resumeEducation.innerHTML = educationHTML;

    const experienceGroups = document.querySelectorAll('.experience-group');
    let workExperienceHTML = '';

    experienceGroups.forEach((group, index) => {
        const company = (group.querySelector(`#company-${index + 1}`) as HTMLInputElement).value;
        const position = (group.querySelector(`#position-${index + 1}`) as HTMLInputElement).value;
        const duration = (group.querySelector(`#duration-${index + 1}`) as HTMLInputElement).value;
        const responsibility = (group.querySelector(`#responsibility-${index + 1}`) as HTMLInputElement).value;


        workExperienceHTML += `
            <div class="work-experience-entry">
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                <p><strong>Responsibilities:</strong> ${responsibility}</p><br>
                
            </div>`;
    });
    resumeWorkExperience.innerHTML = workExperienceHTML;
   


    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const linkedin_id = (document.getElementById("linkedin-id") as HTMLInputElement).value;
    const skill1 = (document.getElementById("skill1") as HTMLInputElement).value;
    const skill2 = (document.getElementById("skill2") as HTMLInputElement).value;
    const skill3 = (document.getElementById("skill3") as HTMLInputElement).value;
    const skill4 = (document.getElementById("skill4") as HTMLInputElement).value;
    const photoInput = (document.getElementById("photo") as HTMLInputElement);

   

    const photofile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';

    if (photofile){
        photoBase64 = await filetoBase64(photofile);
        
        localStorage.setItem("resumePhoto" , photoBase64)
        resumePhoto.src = photoBase64
    }

    

    resumeName.textContent= name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.innerHTML = `Phone#:  ${phone}`;
    resumeAddress.textContent = `Address: ${address}`;
    resumeLinkedin.textContent= `Linkedin-ID: ${linkedin_id}`;
    if (linkedin_id) {
        resumeLinkedin.textContent = `Linkedin-ID: ${linkedin_id}`;
        resumeLinkedin.style.display = "block"; 
    } else {
        resumeLinkedin.style.display = "none"; 
    }
    



    resumeSkills.innerHTML = `${skill1}<br>${skill2}<br>${skill3}<br>${skill4}`;

    document.querySelector(".container")?.classList.add("hidden");
    resumePage.classList.remove("hidden");
});
    

function filetoBase64(file:File):Promise<string>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.onloadend=()=>resolve(
            reader.result as string
        )
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
};
document.getElementById("addExperienceButton")?.addEventListener("click", () => {
    const experienceSection = document.getElementById("experience-group");
    const newIndex = document.querySelectorAll(".experience-group").length + 1;

    const newExperienceHTML = `
        <div class="items">
            <label for="company-${newIndex}">Company: </label>
            <input type="text" name="company" id="company-${newIndex}" placeholder="XYZ company">
        </div>
    
        <div class="items">
            <label for="position-${newIndex}">Position:</label>
            <input type="text" name="position" id="position-${newIndex}" placeholder="Software Engineer">
        </div>
    
        <div class="items">
            <label for="duration-${newIndex}">Duration:</label>
            <input type="text" name="duration" id="duration-${newIndex}" placeholder="2015-2019">
        </div>
    
        <div class="items">
            <label for="responsibility-${newIndex}">Responsibilities:</label>
            <input type="text" name="responsibility" id="responsibility-${newIndex}" placeholder="Developed Software">

        </div>
        <button type="button" class="closeExperienceButton" data-index="${newIndex}">Close</button>
    `;

    const newExperienceDiv = document.createElement('div');
    newExperienceDiv.classList.add('experience-group');
    newExperienceDiv.innerHTML = newExperienceHTML;

    experienceSection?.appendChild(newExperienceDiv);
    newExperienceDiv.querySelector('.closeExperienceButton')?.addEventListener("click", function () {
        newExperienceDiv.remove();
    });
});

document.getElementById("addEducationButton")?.addEventListener("click", () => {
    const educationSection = document.getElementById("education-group");
    const newIndex = document.querySelectorAll(".education-group").length + 1;

    const newEducationHTML = `
        <div class="items">
            <label for="degree-${newIndex}">Degree:</label>
            <input type="text" name="degree" id="degree-${newIndex}" placeholder="BSCS">
        </div>

        <div class="items">
            <label for="institute-${newIndex}">Institute:</label>
            <input type="text" name="institute" id="institute-${newIndex}" placeholder="ABC University">
        </div>

        <div class="items">
            <label for="year-${newIndex}">Passing Year:</label>
            <input type="text" name="year" id="year-${newIndex}" placeholder="2015-2018">
        </div>
        <button type="button" class="closeEducationButton" data-index="${newIndex}">Close</button>
        
    `;

    const newEducationDiv = document.createElement('div');
    newEducationDiv.classList.add('education-group');
    newEducationDiv.innerHTML = newEducationHTML;

    educationSection?.appendChild(newEducationDiv);
    newEducationDiv.querySelector('.closeEducationButton')?.addEventListener("click", function () {
        newEducationDiv.remove();
    });
});

editButton.addEventListener("click", () => {
    

    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");


    populateFormForEdit();
});



function populateFormForEdit() {

   
    const name = (document.getElementById("resumeName") as HTMLElement).textContent || "";
    const email = (document.getElementById("resumeEmail") as HTMLElement).textContent || "";
    const phone = (document.getElementById("resumePhone") as HTMLElement).textContent || "";
    const address = (document.getElementById("resumeAddress") as HTMLElement).textContent || "";
    const linkedin = (document.getElementById("resumeLinkedin") as HTMLElement).textContent || "";
    const skills = (document.getElementById("resumeSkills") as HTMLElement).innerHTML.split("<br>") || [];

    (document.getElementById("name") as HTMLInputElement).value = name;
    (document.getElementById("email") as HTMLInputElement).value = email.replace("Email: ", "");
    (document.getElementById("phone") as HTMLInputElement).value = phone.replace("Phone#: ", "");
    (document.getElementById("address") as HTMLInputElement).value = address.replace("Address: ", "");
    (document.getElementById("linkedin-id") as HTMLInputElement).value = linkedin.replace("Linkedin-ID: ", "");
  
    (document.getElementById("skill1") as HTMLInputElement).value = skills[0] || "";
    (document.getElementById("skill2") as HTMLInputElement).value = skills[1] || "";
    (document.getElementById("skill3") as HTMLInputElement).value = skills[2] || "";
    (document.getElementById("skill4") as HTMLInputElement).value = skills[3] || "";

    const educationGroups = document.querySelectorAll('.education-entry');
    educationGroups.forEach((group, index) => {
        const degreeText = group.querySelector('strong:contains("Degree:") + p')?.textContent || '';
        const instituteText = group.querySelector('strong:contains("Institute:") + p')?.textContent || '';
        const yearText = group.querySelector('strong:contains("Year:") + p')?.textContent || '';

        const degreeInput = document.getElementById(`degree-${index + 1}`) as HTMLInputElement;
        const instituteInput = document.getElementById(`institute-${index + 1}`) as HTMLInputElement;
        const yearInput = document.getElementById(`year-${index + 1}`) as HTMLInputElement;

        if (degreeInput) degreeInput.value = degreeText.replace('Degree: ', '').trim();
        if (instituteInput) instituteInput.value = instituteText.replace('Institute: ', '').trim();
        if (yearInput) yearInput.value = yearText.replace('Year: ', '').trim();
    });

    // Pre-fill Work Experience
    const workExperienceGroups = document.querySelectorAll('.work-experience-entry');
    workExperienceGroups.forEach((group, index) => {
        const companyText = group.querySelector('strong:contains("Company:") + p')?.textContent || '';
        const positionText = group.querySelector('strong:contains("Position:") + p')?.textContent || '';
        const durationText = group.querySelector('strong:contains("Duration:") + p')?.textContent || '';
        const responsibilityText = group.querySelector('strong:contains("Responsibilities:") + p')?.textContent || '';

        const companyInput = document.getElementById(`company-${index + 1}`) as HTMLInputElement;
        const positionInput = document.getElementById(`position-${index + 1}`) as HTMLInputElement;
        const durationInput = document.getElementById(`duration-${index + 1}`) as HTMLInputElement;
        const responsibilityInput = document.getElementById(`responsibility-${index + 1}`) as HTMLInputElement;

        if (companyInput) companyInput.value = companyText.replace('Company: ', '').trim();
        if (positionInput) positionInput.value = positionText.replace('Position: ', '').trim();
        if (durationInput) durationInput.value = durationText.replace('Duration: ', '').trim();
        if (responsibilityInput) responsibilityInput.value = responsibilityText.replace('Responsibilities: ', '').trim();
    });

}
