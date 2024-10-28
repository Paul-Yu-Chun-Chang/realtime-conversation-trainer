import { Camera, requestPermissions } from '@nativescript/camera';

export class CameraService {
    constructor() {
        this.camera = null;
        this.initialize();
    }

    async initialize() {
        try {
            await requestPermissions();
            this.camera = new Camera();
        } catch (error) {
            console.error('Camera initialization failed:', error);
        }
    }

    async takePicture() {
        if (!this.camera) return null;
        try {
            const imageAsset = await this.camera.takePicture();
            return imageAsset;
        } catch (error) {
            console.error('Failed to take picture:', error);
            return null;
        }
    }
}