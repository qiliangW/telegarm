import { type FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { Tabs, Field, Slider, Button } from 'react-vant';
import { updatePlan } from '@/api/plan';
import { useNavigate } from 'react-router-dom';
import { PlanTable } from '../PlanTable';
import './PlanItem.scss';
export default function OrderItem(props: any) {
  const nanigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const groupedOptions = [
    {
      label: '水果', // 分组名称
      options: [
        { value: 'apple', label: '苹果' },
        { value: 'banana', label: '香蕉' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
    {
      label: '蔬菜',
      options: [
        { value: 'carrot', label: '胡萝卜' },
        { value: 'tomato', label: '番茄' },
      ],
    },
  ];
  const getEffect = () => {
    if (!props.execNum) return;
    nanigate('/effectiveness', {
      state: {
        execNum: props.execNum,
      },
    });
    // getpingData({});
  };
  return (
    <>
      <div className="plan-box-item">
        <div className="header-title">Attack Hub</div>
        <div className="plan-content">
          <Tabs type="card">
            <Tabs.TabPane title="Layer4">
              <div className="plan-box-content">
                <div className="content-item">
                  <p>Attack Method</p>
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        backgroundColor: '#222339',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: 'white', // 修改选中项的显示文字颜色
                        paddingLeft: '10px',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        fontSize: '12px',
                        backgroundColor: state.isSelected
                          ? '#4CAF50'
                          : '222339', // 选中时绿色，默认白色
                        color: state.isSelected ? 'white' : 'black', // 选中时文字白色
                        ':active': {
                          backgroundColor: 'red', // 点击时的背景色
                        },
                      }),
                    }}
                    isSearchable={false}
                    options={groupedOptions}
                    menuPlacement="auto" // 自动选择下拉方向
                  />
                </div>
                <div className="content-item">
                  <p>Address</p>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <p>Port</p>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <p>Time</p>
                  <div className="slider-box">
                    <Slider barHeight={6} buttonSize={'16px'} />
                  </div>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <p>Concurrents</p>
                  <div className="slider-box">
                    <Slider barHeight={6} buttonSize={'16px'} />
                  </div>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <Button type="primary" size="small">
                    Send Attack
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane title="Layer7">
              {' '}
              <div className="plan-box-content">
                <div className="content-item">
                  <p>Attack Method</p>
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '12px',
                        backgroundColor: '#222339',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: 'white', // 修改选中项的显示文字颜色
                        paddingLeft: '10px',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        fontSize: '12px',
                        backgroundColor: state.isSelected
                          ? '#4CAF50'
                          : '222339', // 选中时绿色，默认白色
                        color: state.isSelected ? 'white' : 'black', // 选中时文字白色
                        ':active': {
                          backgroundColor: 'red', // 点击时的背景色
                        },
                      }),
                    }}
                    isSearchable={false}
                    options={groupedOptions}
                    menuPlacement="auto" // 自动选择下拉方向
                  />
                </div>
                <div className="content-item">
                  <p>Address</p>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <p>Port</p>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <p>Time</p>
                  <div className="slider-box">
                    <Slider barHeight={6} buttonSize={'16px'} />
                  </div>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <p>Concurrents</p>
                  <div className="slider-box">
                    <Slider barHeight={6} buttonSize={'16px'} />
                  </div>
                  <Field className="custom-field" />
                </div>
                <div className="content-item">
                  <Button type="primary" size="small">
                    Send Attack
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}
