import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // ─── Set Public API Permissions ──────────────────
    // Allow public (unauthenticated) access to read skill data
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const permissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: publicRole.id } });

    const existingActions = permissions.map((p: any) => p.action);

    // APIs and actions to make public (read-only)
    const publicActions = [
      'api::skill-item.skill-item.find',
      'api::skill-item.skill-item.findOne',
      'api::skill-content.skill-content.find',
      'api::skill-content.skill-content.findOne',
      'api::skill-quiz.skill-quiz.find',
      'api::skill-quiz.skill-quiz.findOne',
      'api::quiz-option.quiz-option.find',
      'api::quiz-option.quiz-option.findOne',
    ];

    for (const action of publicActions) {
      if (!existingActions.includes(action)) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
            enabled: true,
          },
        });
      }
    }

    strapi.log.info('✅ Public API permissions set for Skill APIs');
  },
};

