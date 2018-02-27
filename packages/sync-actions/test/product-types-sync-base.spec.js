import clone from '../src/utils/clone'
import productTypesSyncFn, { actionGroups } from '../src/product-types'
import { baseActionsList } from '../src/product-types-actions'

describe('Exports', () => {
  it('action group list', () => {
    expect(actionGroups).toEqual(['base', 'attributes'])
  })

  it('correctly define base actions list', () => {
    expect(baseActionsList).toEqual([
      { action: 'changeName', key: 'name' },
      { action: 'setKey', key: 'key' },
      { action: 'setDescription', key: 'description' },
    ])
  })
  it('correctly define attribute definitions actions list', () => {})
})

describe('Actions', () => {
  let productTypesSync
  let updateActions
  let before
  let now
  beforeEach(() => {
    productTypesSync = productTypesSyncFn()
  })
  describe('mutation', () => {
    it('should ensure given objects are not mutated', () => {
      before = {
        name: 'Sneakers',
        key: 'unique-key',
      }
      now = {
        name: 'Sneakers',
        key: 'unique-key-2',
      }
      productTypesSync.buildActions(now, before)
      expect(before).toEqual(clone(before))
      expect(now).toEqual(clone(now))
    })
  })
  describe('with name change', () => {
    beforeEach(() => {
      before = {
        name: 'Sneakers',
      }
      now = {
        name: 'Kicks',
      }
      updateActions = productTypesSync.buildActions(now, before)
    })
    it('should return `changeName` update-action', () => {
      expect(updateActions).toEqual([
        {
          action: 'changeName',
          name: 'Kicks',
        },
      ])
    })
  })
  describe('with key change', () => {
    beforeEach(() => {
      before = {
        key: 'sneakers-key',
      }
      now = {
        key: 'kicks-key',
      }
      updateActions = productTypesSync.buildActions(now, before)
    })
    it('should return `setKey` update-action', () => {
      expect(updateActions).toEqual([
        {
          action: 'setKey',
          key: 'kicks-key',
        },
      ])
    })
  })
  describe('with description change', () => {
    beforeEach(() => {
      before = {
        description: 'sneakers-description',
      }
      now = {
        description: 'kicks-description',
      }
      updateActions = productTypesSync.buildActions(now, before)
    })
    it('should return `changeKey` update-action', () => {
      expect(updateActions).toEqual([
        {
          action: 'setDescription',
          description: 'kicks-description',
        },
      ])
    })
  })
})