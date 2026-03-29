import { defineType, defineField } from 'sanity'

export const portfolioSchema = defineType({
  name: 'portfolio',
  title: '作品与荣誉',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: '年份 (可填区间，如 2024-2027)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: '作品', value: 'portfolio' },
          { title: '荣誉', value: 'award' },
          { title: '技能', value: 'skill' },
        ],
      },
    }),
    defineField({
      name: 'domain',
      title: '领域/级别 (荣誉请选取对应的级别)',
      type: 'string',
      options: {
        list: [
          { title: '[经验] 智能建筑与建造', value: 'building' },
          { title: '[经验] 战略策划与科研', value: 'research' },
          { title: '[经验] 运营管理', value: 'management' },
          { title: '[荣誉] 国际级', value: 'intl' },
          { title: '[荣誉] 国家级', value: 'national' },
          { title: '[荣誉] 省部级', value: 'provincial' },
          { title: '[荣誉] 市厅级', value: 'city' },
          { title: '[荣誉] 院校级', value: 'school' },
          { title: '[荣誉] 专利/著作', value: 'patent' },
        ],
      },
    }),
    defineField({
      name: 'role',
      title: '职责',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
    }),
    defineField({
      name: 'media',
      title: '媒体资源',
      type: 'array',
      of: [{ type: 'image' }, { type: 'file' }],
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub 链接',
      type: 'url',
    }),
    defineField({
      name: 'keywords',
      title: '关键词',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
