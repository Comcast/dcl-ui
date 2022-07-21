const baseModelVersion = {
	vid: 0,
	pid: 0,
	softwareVersion: 0,
	softwareVersionString: '',
	cdVersionNumber: 0,
	firmwareDigests: '',
	softwareVersionValid: false,
	otaUrl: '',
	otaFileSize: 0,
	otaChecksum: '',
	otaChecksumType: 0,
	minApplicableSoftwareVersion: 0,
	maxApplicableSoftwareVersion: 0,
	releaseNotesUrl: '',
	creator: ''
};
const baseModelVersions = { vid: 0, pid: 0, softwareVersions: 0 };

function fromPartial(object) {
	const message = { ...baseModelVersion };
	if (object.vid !== undefined && object.vid !== null) {
			message.vid = object.vid;
	}
	else {
			message.vid = 0;
	}
	if (object.pid !== undefined && object.pid !== null) {
			message.pid = object.pid;
	}
	else {
			message.pid = 0;
	}
	if (object.softwareVersion !== undefined && object.softwareVersion !== null) {
			message.softwareVersion = object.softwareVersion;
	}
	else {
			message.softwareVersion = 0;
	}
	if (object.softwareVersionString !== undefined && object.softwareVersionString !== null) {
			message.softwareVersionString = object.softwareVersionString;
	}
	else {
			message.softwareVersionString = '';
	}
	if (object.cdVersionNumber !== undefined && object.cdVersionNumber !== null) {
			message.cdVersionNumber = object.cdVersionNumber;
	}
	else {
			message.cdVersionNumber = 0;
	}
	if (object.firmwareDigests !== undefined && object.firmwareDigests !== null) {
			message.firmwareDigests = object.firmwareDigests;
	}
	else {
			message.firmwareDigests = '';
	}
	if (object.softwareVersionValid !== undefined && object.softwareVersionValid !== null) {
			message.softwareVersionValid = object.softwareVersionValid;
	}
	else {
			message.softwareVersionValid = false;
	}
	if (object.otaUrl !== undefined && object.otaUrl !== null) {
			message.otaUrl = object.otaUrl;
	}
	else {
			message.otaUrl = '';
	}
	if (object.otaFileSize !== undefined && object.otaFileSize !== null) {
			message.otaFileSize = object.otaFileSize;
	}
	else {
			message.otaFileSize = 0;
	}
	if (object.otaChecksum !== undefined && object.otaChecksum !== null) {
			message.otaChecksum = object.otaChecksum;
	}
	else {
			message.otaChecksum = '';
	}
	if (object.otaChecksumType !== undefined && object.otaChecksumType !== null) {
			message.otaChecksumType = object.otaChecksumType;
	}
	else {
			message.otaChecksumType = 0;
	}
	if (object.minApplicableSoftwareVersion !== undefined && object.minApplicableSoftwareVersion !== null) {
			message.minApplicableSoftwareVersion = object.minApplicableSoftwareVersion;
	}
	else {
			message.minApplicableSoftwareVersion = 0;
	}
	if (object.maxApplicableSoftwareVersion !== undefined && object.maxApplicableSoftwareVersion !== null) {
			message.maxApplicableSoftwareVersion = object.maxApplicableSoftwareVersion;
	}
	else {
			message.maxApplicableSoftwareVersion = 0;
	}
	if (object.releaseNotesUrl !== undefined && object.releaseNotesUrl !== null) {
			message.releaseNotesUrl = object.releaseNotesUrl;
	}
	else {
			message.releaseNotesUrl = '';
	}
	if (object.creator !== undefined && object.creator !== null) {
			message.creator = object.creator;
	}
	else {
			message.creator = '';
	}
	return message;
}

let model = fromPartial({});

// For each key in object print to console
for (let key in model) {
	  var fieldName = camelCase(key);
		var fieldCode = `
		<!-- Field for ${key} -->
		<div class="field">
		<label for="${key}">${fieldName}</label>
				<InputText id="${key}" type="text" v-model="v$.modelVersion.${key}.$model" :class="{ 'p-invalid': v$.modelVersion.${key}.$invalid && submitted }" />
		</div>`

		console.log(fieldCode);


}

// function to convert camelCase to words with first letter capitalized
function camelCase(str) {
		return str.replace(/([A-Z])/g, " $1")
				.replace(/^./, function(str){ return str.toUpperCase(); });
}





