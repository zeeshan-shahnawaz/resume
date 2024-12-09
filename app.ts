// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form') as HTMLFormElement;

const validType = {
  TEXT: 'text',
  TEXT_EMP: 'text_emp',
  EMAIL: 'email',
  DIGIT: 'digit',
  PHONENO: 'phoneno',
  ANY: 'any',
}

// User inputs elements
let firstnameElem: HTMLInputElement = mainForm.firstname as HTMLInputElement;
let middlenameElem: HTMLInputElement = mainForm.middlename as HTMLInputElement;
let lastnameElem: HTMLInputElement = mainForm.lastname as HTMLInputElement;
let imageElem: HTMLInputElement = mainForm.image as HTMLInputElement; // Assuming image is an input type="file"
let designationElem: HTMLInputElement = mainForm.designation as HTMLInputElement;
let addressElem: HTMLTextAreaElement = mainForm.address as HTMLTextAreaElement; // Assuming address is a textarea
let emailElem: HTMLInputElement = mainForm.email as HTMLInputElement;
let phonenoElem: HTMLInputElement = mainForm.phoneno as HTMLInputElement;
let summaryElem: HTMLTextAreaElement = mainForm.summary as HTMLTextAreaElement;

// Display elements
let nameDsp: HTMLElement = document.getElementById('fullname_dsp')!;
let imageDsp: HTMLImageElement = document.getElementById('image_dsp') as HTMLImageElement;
let phonenoDsp: HTMLElement = document.getElementById('phoneno_dsp')!;
let emailDsp: HTMLElement = document.getElementById('email_dsp')!;
let addressDsp: HTMLElement = document.getElementById('address_dsp')!;
let designationDsp: HTMLElement = document.getElementById('designation_dsp')!;
let summaryDsp: HTMLElement = document.getElementById('summary_dsp')!;
let projectsDsp: HTMLElement = document.getElementById('projects_dsp')!;
let achievementsDsp: HTMLElement = document.getElementById('achievements_dsp')!;
let skillsDsp: HTMLElement = document.getElementById('skills_dsp')!;
let educationsDsp: HTMLElement = document.getElementById('educations_dsp')!;
let experiencesDsp: HTMLElement = document.getElementById('experiences_dsp')!;

// Type definitions for data structures
interface Achievement {
  achieve_title: string;
  achieve_description: string;
}

interface Experience {
  exp_title: string;
  exp_organization: string;
  exp_location?: string; // Optional property
  exp_start_date: string;
  exp_end_date: string;
  exp_description: string;
}

interface Education {
  edu_school: string;
  edu_degree: string;
  edu_city?: string; // Optional property
  edu_start_date: string;
  edu_graduation_date: string;
  edu_description: string;
}

interface Project {
  proj_title: string;
  proj_link: string;
  proj_description: string;
}

interface Skill {
  skill: string;
}

interface UserData {
  firstname: string;
  middlename: string;
  lastname: string;
  designation: string;
  address: string;
  email: string;
  phoneno: string;
  summary: string;
  achievements: Achievement[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}

// Fetch values function with type annotations
const fetchValues = <T extends string>(attrs: T[], ...nodeLists: NodeListOf<Element>[]): Array<{ [key in T]: string }> => {
  let elemsAttrsCount = nodeLists.length;
  let elemsDataCount = nodeLists[0].length;
  let tempDataArr: Array<{ [key in T]: string }> = [];

  // first loop deals with the no of repeaters value
  for (let i = 0; i < elemsDataCount; i++) {
    let dataObj: { [key in T]: string } = {} as { [key in T]: string }; // Typed object for data
    // second loop fetches the data for each repeaters value or attributes
    for (let j = 0; j < elemsAttrsCount; j++) {
      (dataObj as { [key in T]: string })[attrs[j]] = (nodeLists[j][i] as HTMLInputElement).value as string; // Cast to HTMLInputElement
    }
    tempDataArr.push(dataObj);
  }

  return tempDataArr;
};

const getUserInputs = (): UserData => {
  // Fetch data from form elements

  // ...existing code...

  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
    experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
    educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
    projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
    skills: fetchValues(['skill'], skillElem),
  };
};
  // Fetch data from form elements
  let achievementsTitleElem = document.querySelectorAll('.achieve_title');
  let achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
  let expTitleElem = document.querySelectorAll('.exp_title');
  let expOrganizationElem = document.querySelectorAll('.exp_organization');
  let expLocationElem = document.querySelectorAll('.exp_location');
  let expStartDateElem = document.querySelectorAll('.exp_start_date');
  let expEndDateElem = document.querySelectorAll('.exp_end_date');
  let expDescriptionElem = document.querySelectorAll('.exp_description');
  let eduSchoolElem = document.querySelectorAll('.edu_school');
  let eduDegreeElem = document.querySelectorAll('.edu_degree');
  let eduCityElem = document.querySelectorAll('.edu_city');
  let eduStartDateElem = document.querySelectorAll('.edu_start_date');
  let eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
  let eduDescriptionElem = document.querySelectorAll('.edu_description');
  let projTitleElem = document.querySelectorAll('.proj_title');
  let projLinkElem = document.querySelectorAll('.proj_link');
  let projDescriptionElem = document.querySelectorAll('.proj_description');
  let skillElem = document.querySelectorAll('.skill');

  // Event listeners for form validation
  firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
  middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
  lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
  phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
  emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
  addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
  designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));
  
  achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
  achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
  expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
  expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
  expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
  expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
  expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
  expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
  
  function validateFormData(target: EventTarget | null, type: string, fieldName: string) {
    // ...validation logic...
  }


  // ... other code ...

eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

function getFormData(): UserData {
  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
    experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
    educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
    projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
    skills: fetchValues(['skill'], skillElem)
  };
}

function main() {
  return getFormData();
}

main();

// Removed duplicate function implementation
  
  // adding the invalid text
  function addErrMsg(formElem: HTMLElement, formElemName: string) {
    formElem.nextElementSibling!.innerHTML = `${formElemName} is invalid`;
  }
  
  // removing the invalid text 
  function removeErrMsg(formElem: HTMLElement) {
    formElem.nextElementSibling!.innerHTML = "";
  }
  
  // show the list data
  const showListData = (listData: any[], listContainer: HTMLElement) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
      let itemElem = document.createElement('div');
      itemElem.classList.add('preview-item');
  
      for (const key in listItem) {
        let subItemElem = document.createElement('span');
        subItemElem.classList.add('preview-item-val');
        subItemElem.innerHTML = `${listItem[key]}`;
        itemElem.appendChild(subItemElem);
      }
  
      listContainer.appendChild(itemElem);
    });
  };
  
  const displayCV = (userData: UserData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
  };
  
  // generate CV
  const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
  };
  
  function previewImage() {
    let oFReader = new FileReader();
    if (imageElem.files && imageElem.files[0]) {
      oFReader.readAsDataURL(imageElem.files[0]);
      oFReader.onload = function (ofEvent) {
        if (ofEvent.target) {
          imageDsp.src = ofEvent.target.result as string;
        }
      };
    }
  }
  
  // print CV
  function printCV() {
    window.print();
  }
// ... other code ...


