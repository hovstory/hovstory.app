export const generateImageName = (length: number): string => {
	var imageName = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (let index = 0; index < length; index++) {
		imageName += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	imageName += Date.now();
	return imageName;
};
