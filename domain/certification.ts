export interface CertificationUsecase {
    createCertText: (publicKey: string) => Promise<string>;
    checkValidation: (address: string, decryptedText: string) => Promise<boolean>;
}