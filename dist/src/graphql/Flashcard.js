"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardMutation = exports.flashcardQuery = exports.Flashcard = void 0;
const nexus_1 = require("nexus");
exports.Flashcard = (0, nexus_1.objectType)({
    name: "Flashcard",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("question");
        t.nonNull.string("answer");
        t.field("createdBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.flashcard
                    .findUnique({ where: { id: parent.id } })
                    .createdBy();
            },
        });
    },
});
exports.flashcardQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("flashcards", {
            type: "Flashcard",
            resolve(parent, args, context, info) {
                return context.prisma.flashcard.findMany();
            },
        });
    },
});
exports.flashcardMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("create", {
            type: "Flashcard",
            args: {
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                question: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                answer: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve(parent, args, context) {
                const { title, question, answer } = args;
                const { userId } = context;
                if (!userId) {
                    throw new Error("Cannot make flashcard without logging in.");
                }
                const newCard = context.prisma.flashcard.create({
                    data: {
                        title,
                        question,
                        answer,
                        createdBy: { connect: { id: userId } },
                    },
                });
                return newCard;
            },
        });
    },
});
//# sourceMappingURL=Flashcard.js.map