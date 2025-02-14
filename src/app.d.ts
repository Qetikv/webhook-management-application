declare global {
	namespace App {}

	interface Webhook {
		id: string;
		nickname: string;
		url: string;
		createdDate: string;
		lastModifiedDate: string;
		lastModifiedUser: {
			avatar: string;
			name: string;
		};
		authorizationType: string;
	}
}

export {};
