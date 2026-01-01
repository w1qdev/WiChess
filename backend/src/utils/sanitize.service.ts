class SanitizeService {
    static sanitizeEmail(email: string) {
        return email.trim().toLowerCase()
    }

    static sanitizeString(input: string) {
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove dangerous characters
            .replace(/['";\\]/g, '') // Remove SQL-injection characters
    }

    static sanitizePassword(password: string) {
        return password.replace(/[^a-zA-Z0-9]/g, '') // Remove dangerous characters
    }

    static sanitizeName(name: string) {
        return name.replace(/[^a-zA-Z0-9]/g, '') // Remove dangerous characters
    }

    static sanitizeId(id: string) {
        return id.replace(/[^a-zA-Z0-9]/g, '') // Remove dangerous characters
    }
}

export default SanitizeService
