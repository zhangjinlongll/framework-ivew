import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Counter from '../zn_vue_ui_basepage/src/components/Counter.vue'

describe('Counter.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = shallowMount(Counter)
    wrapper.find('button').trigger('click')
    expect(wrapper.find('div').text()).contains('1')
  })
})
