import slugify from "slugify";

export default {
    async beforeCreate(event) {
        const { data } = event.params;

        if (data.title) {
            const baseSlug = slugify(data.title, { lower: true, strict: true });
            const uniqueId = crypto.randomUUID().slice(0, 6);
            data.slug = `${baseSlug}-${uniqueId}`;
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        if (data.title) {
            const baseSlug = slugify(data.title, { lower: true, strict: true });
            const uniqueId = crypto.randomUUID().slice(0, 6);
            data.slug = `${baseSlug}-${uniqueId}`;
        }
    },
};
