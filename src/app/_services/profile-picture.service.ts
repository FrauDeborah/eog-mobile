import { Injectable } from '@angular/core';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'

import { ApiService } from './api.service'
import { FunctionPromiseService } from './function-promise.service';

import { Constants } from '../../_constants/constants';

import { environment } from '../../_environments/environment';

@Injectable()
export class ProfilePictureService { 

	_functionPromiseService = new FunctionPromiseService();

	constructor(private _apiService: ApiService,
				private _constants: Constants,
				private transfer: FileTransfer,
				private file: File) { 

	}

	init() {

		// Why do we do this? Why not just define and call a function?

		// because this gives us a framework, to call the method, and reuse the promise from it.
		//  we get the promise once, and return it over and over. Otherwise, we'd get a new promise
		//  (and new API call) each time, unless we figured a way to save the original promise.
		//  which is what this is. part of, anyway.

		// We don't put the SET/DELETE functionality in the framework because it will not be repeatedly called 
		//  by Angular; only once when the button is pushed.

		let self = this;
		self._functionPromiseService.initFunc(self._constants.FUNCTION_KEY_PROFILE_PICTURE_GET, (id) => {
			let rtn = new Promise((resolve, reject) => {
				
				let foo = self.file.checkFile(self.file.cacheDirectory, "eogAppProfilePic" + id);
				foo.then((isFileExists) => {
					if (isFileExists) {
						console.log("THE GET FUNC: image already exists on phone. returning its path")
						resolve(self.file.cacheDirectory + "eogAppProfilePic" + id);
					} 
				}).catch(e => { 

					console.log("THE GET FUNC: image does not already exist on phone.")

				    let url = environment.apiUrl + "/api/user/" + id + "/profile/picture/isFound";
				    this._apiService.get(url).subscribe((isFound) => {
				    	if (isFound["_body"] == "true") {
							url = environment.apiUrl + "/api/user/" + id + "/profile/picture";
							const fileTransfer: FileTransferObject = self.transfer.create();

							console.log("image download about to initiate....");
							fileTransfer.download(url, self.file.cacheDirectory + "eogAppProfilePic" + id).then((entry) => {
							    resolve(self.file.cacheDirectory + "eogAppProfilePic" + id);
							    console.log('download complete: ' + entry.toURL());
					  		}, (error) => {
					    		// handle error
					    		console.log(error);
					    		reject();
					  		});

				    	} else {
							resolve(undefined);
				    	}
				    });
				});

			});

			return rtn;
		});
	}

	reset(userId) {
		return this._functionPromiseService.reset(userId);
	}

	get(userId) {
		return this._functionPromiseService.get(userId, this._constants.FUNCTION_KEY_PROFILE_PICTURE_GET);
	}

	delete(userId) {
		console.log("PPS: userId " + userId +" returning promis which calls API to delete profile picture.");
		return new Promise((resolve, reject) => {
			let url = environment.apiUrl + "/api/user/" + userId + "/profile/picture";
			this._apiService.delete(url).subscribe((data) => {
				resolve(data);
			})
		});
	}

	save(userId, filename) {
		return new Promise((resolve, reject) => {
			console.log("image upload about to initiate....");
			const fileTransfer: FileTransferObject = this.transfer.create();

			let options: FileUploadOptions = {
			     fileKey: 'file',
			     fileName: filename, 
			     headers: {}
			}

			fileTransfer.upload(filename, environment.apiUrl + "/api/user/" + userId + "/profile/picture", options)
			   .then((data) => {
			     // success
			     console.log("image upload succeeded");
			     console.log(data);

			     resolve(data);
			   }, (err) => {
			     // error
			     console.log(err);
			     reject();
			   });
		});
	}
}