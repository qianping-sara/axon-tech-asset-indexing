# Data Ingestion Advisor - 推荐逻辑矩阵

## 规则引擎配置表（与自动化解决方案规则引擎对齐）

### 快速路径（Q1、Q2）

| 规则 | 条件 | 推荐 | 类型 | 说明 |
|------|------|------|------|------|
| **规则0** | Q2 == "Mapping" | 模板化提取 | matched | 非AI路径：使用RPA/LCAP/脚本 |
| **Q1** | Q1 == "Yes" | Shift-Left | matched | 在源头实现数字化 |

### Q3诊断矩阵（基于Q3.1、Q3.2、Q3.3、Q3.4）

| 规则 | Q3.1 | Q3.2 | Q3.3 | Q3.4 | 推荐类型 | 策略 | 说明 |
|------|------|------|------|------|---------|------|------|
| **规则1** | common | 任意 | 任意 | 任意 | downgrade | 使用现有模型 | 过度设计检测 |
| **规则2** | new_pattern | level2 | efficiency | ≠ not_ready | ✅ matched | AutoML训练 | 完美匹配 |
| **规则3** | new_cognitive | level3 | 任意 | ≠ not_ready | ✅ matched | 定制模型 | 完美匹配 |
| **规则4** | new_pattern / new_cognitive | 任意 | 任意 | not_ready | 🛑 blocked | 项目阻断 | 数据未就绪，停止AI开发 |
| **规则5** | new_pattern / new_cognitive | level1 | 任意 | 任意 | ⚠️ warning | 提交给AI CoE | 严重能力不匹配 |
| **规则6** | new_cognitive | level2 | 任意 | 任意 | ⚠️ warning | 提交给AI CoE | 能力不匹配（L3问题vs L2资源） |
| **规则7** | common | level2 / level3 | 任意 | 任意 | downgrade | 从Level1开始 | 过度设计建议 |
| **规则8** | common / new_pattern | level1 | critical | 任意 | ⚠️ warning | 高风险警告 | 需要严格PoC测试 |
| **规则9** | new_cognitive | level3 | efficiency | 任意 | ℹ️ info | 成本效益建议 | 确认TCO和ROI |

## 当前实现 vs 规则引擎的差异

### ✅ 已正确实现的规则

| 规则 | 状态 | 说明 |
|------|------|------|
| 规则0 | ✅ | Q2="Mapping" → 模板化提取 |
| 规则1 | ✅ | Common → 使用现有模型（downgrade） |
| 规则2 | ⚠️ 部分 | new_pattern + level2 + efficiency → AutoML，但未考虑Q3.4 |
| 规则3 | ⚠️ 部分 | new_cognitive + level3 → 定制模型，但未考虑Q3.4 |
| 规则7 | ✅ | Common + level2/3 → 降级建议 |

### ❌ 缺失或不完整的规则

| 规则 | 状态 | 问题 | 优先级 |
|------|------|------|--------|
| 规则4 | ❌ 缺失 | 数据未就绪 → 项目阻断 | 🔴 高 |
| 规则5 | ⚠️ 不完整 | new_pattern/new_cognitive + level1 → 应提交给AI CoE | 🔴 高 |
| 规则6 | ⚠️ 不完整 | new_cognitive + level2 → 应提交给AI CoE | 🔴 高 |
| 规则8 | ❌ 缺失 | BusinessCritical + level1 → 高风险警告 | 🟡 中 |
| 规则9 | ❌ 缺失 | Efficiency + level3 → 成本效益建议 | 🟡 中 |
| Q3.4集成 | ❌ 缺失 | 所有规则都需要考虑数据就绪程度 | 🔴 高 |

### 关键改进点

1. **集成Q3.4（数据就绪程度）**
   - 规则2、3需要检查Q3.4 != "not_ready"
   - 规则4：如果Q3.4 == "not_ready" → 项目阻断
   - 规则2（partial）：在nextSteps中添加"数据准备"任务

2. **明确"AI CoE"选项**
   - 规则5：new_pattern/new_cognitive + level1 → 提交给AI CoE
   - 规则6：new_cognitive + level2 → 提交给AI CoE
   - 更新warning消息，明确提到"AI CoE"和排队流程

3. **添加高风险警告（规则8）**
   - 条件：BusinessCritical + level1
   - 需要严格的PoC测试
   - 如果失败，必须升级为L2/L3项目

4. **添加成本效益建议（规则9）**
   - 条件：Efficiency + level3
   - 在nextSteps中添加"确认TCO和ROI"

## 实现计划

### 优先级1：核心规则实现（🔴 高优先级）

#### 1.1 集成Q3.4到所有规则
```
修改 generateAIRecommendation() 函数签名：
- 添加 q3_4?: string 参数
- 在规则2、3中检查 q3_4 != 'not_ready'
- 在规则4中检查 q3_4 == 'not_ready'
```

#### 1.2 实现规则4：数据未就绪阻断
```
IF: (q3_1 == 'new_pattern' OR 'new_cognitive') AND q3_4 == 'not_ready'
THEN:
  - type: 'blocked'
  - strategy: '项目阻断：数据未就绪'
  - description: 'L2/L3模型无法在数据未就绪的情况下启动'
  - nextSteps: ['停止所有AI开发', '转向数据收集/治理（预计1-3个月）']
```

#### 1.3 完善规则5和规则6：提交给AI CoE
```
规则5: new_pattern/new_cognitive + level1
规则6: new_cognitive + level2

修改建议：
- 明确提到"AI CoE"（集团AI团队）
- 说明排队流程和预期时间
- 提供其他替代方案
```

### 优先级2：增强规则实现（🟡 中优先级）

#### 2.1 实现规则8：高风险警告
```
IF: (q3_1 == 'common' OR 'new_pattern') AND q3_2 == 'level1' AND q3_3 == 'critical'
THEN:
  - 在规则1的基础上添加高风险警告
  - 要求严格的PoC测试
  - 如果失败，必须升级为L2/L3项目
```

#### 2.2 实现规则9：成本效益建议
```
IF: q3_1 == 'new_cognitive' AND q3_2 == 'level3' AND q3_3 == 'efficiency'
THEN:
  - 在规则3的基础上添加成本效益建议
  - 在nextSteps中添加"确认TCO和ROI"
```

### 优先级3：数据就绪程度处理（🟡 中优先级）

#### 3.1 规则2中的数据准备
```
IF: q3_1 == 'new_pattern' AND q3_2 == 'level2' AND q3_3 == 'efficiency' AND q3_4 == 'partial'
THEN:
  - 在nextSteps中添加"数据准备"任务
  - 说明预计时间：2-4周
  - 提供数据清理和标注的指导
```

## 代码实现清单

- [ ] 更新 `generateAIRecommendation()` 函数签名，添加 q3_4 参数
- [ ] 实现规则4：数据未就绪阻断
- [ ] 完善规则5：new_pattern + level1 → AI CoE
- [ ] 完善规则6：new_cognitive + level2 → AI CoE
- [ ] 实现规则8：高风险警告（BusinessCritical + level1）
- [ ] 实现规则9：成本效益建议（Efficiency + level3）
- [ ] 在规则2中处理Q3.4 == 'partial'
- [ ] 更新 DataIngestionSelector 传递 q3_4 参数
- [ ] 更新 ResultCard 显示新的recommendation类型（'blocked'）
- [ ] 测试所有9条规则的场景

