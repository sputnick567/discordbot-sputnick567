function event(newMember, oldMember) {
	let newUserChannel = newMember.voiceChannel
	let oldUserChannel = oldMember.voiceChannel


	if(oldUserChannel === undefined && newUserChannel !== undefined) {

	 // User Joins a voice channel
		console.log(newUserChannel)

	} else if(newUserChannel === undefined){

	// User leaves a voice channel

	}
}

module.exports.event = event;

