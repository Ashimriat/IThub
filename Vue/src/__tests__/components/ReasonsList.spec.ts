import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { REASONS_LIST } from '@/components/ContentWindow/constants';
import ReasonsList from '@/components/ContentWindow/elements/Reasons.vue';


describe('ProgressBar', () => {
  it.each([
    0, 3, 5
  ])('Корректно рендерится c разным количеством причин: [%d]', (lastIndex) => {
    const wrapper = mount(ReasonsList, { 
      props: {
        reasons: REASONS_LIST.slice(0, lastIndex),
      }
    });
    const li = wrapper.findAll('li');
    expect(li.length).toEqual(lastIndex);
    for (let i = 0; i < lastIndex; i++) {
      expect(li[i].text()).toEqual(REASONS_LIST[i]);
    }
  })
})