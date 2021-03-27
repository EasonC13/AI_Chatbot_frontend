<template lang="">
    <div>
        <div id="tables">
            <div class="row">
                <div class="col-md-12 ml-auto mr-auto">
                    <card class="card-plain">
                        <div class="row">
                            <div class="col-sm-12">
                                <el-table :data="tableData">
                                    <el-table-column min-width="50" type="index"></el-table-column>
                                    <el-table-column min-width="150"
                                                        align="left"
                                                        prop="name"
                                                        label="Name">
                                    </el-table-column>
                                    <el-table-column min-width="200"
                                                        prop="job"
                                                        align="left"
                                                        label="Job Position">
                                    </el-table-column>
                                    <el-table-column min-width="150"
                                                        prop="salary"
                                                        align="left"
                                                        label="Salary">
                                    </el-table-column>
                                    <el-table-column min-width="150"
                                                        header-align="right"
                                                        label="Actions">
                                        <div slot-scope="{row}" class="text-right table-actions">
                                            <el-tooltip content="Info"
                                                        :open-delay="300"
                                                        placement="top">
                                                <n-button type="info" size="sm" icon>
                                                    <i class="now-ui-icons users_single-02"></i>
                                                </n-button>
                                            </el-tooltip>


                                            <el-tooltip content="Settings"
                                                        :open-delay="300"
                                                        placement="top">
                                                <n-button type="success" size="sm" icon>
                                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                                </n-button>
                                            </el-tooltip>

                                            <el-tooltip content="Delete"
                                                        :open-delay="300"
                                                        placement="top">
                                                <n-button type="danger" size="sm" icon>
                                                    <i class="now-ui-icons ui-1_simple-remove"></i>
                                                </n-button>
                                            </el-tooltip>

                                        </div>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Card, Button, Checkbox, Comment, FormGroupInput, Pagination} from '@/components';
import {Table, TableColumn, Tooltip} from 'element-ui';
export default {
    name: 'myChats',
    bodyClass: 'myChats',
    components: {
            Card,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Tooltip.name]: Tooltip,
            [Checkbox.name]: Checkbox,
            [Button.name]: Button,
            [FormGroupInput.name]: FormGroupInput,
            [Pagination.name]: Pagination,
            Comment
        },
    data() {
        return {
            tableData: [{
                name: 'Andrew Mike',
                job: 'Develop',
                salary: '€ 99,225',
                active: false
            }, {
                name: 'John Doe',
                job: 'Design',
                salary: '€ 89,241',
                active: false
            }, {
                name: 'Alex Mike',
                job: 'Design',
                salary: '€ 92,144',
                active: false
            }, {
                name: 'Mike Monday',
                job: 'Marketing',
                salary: '€ 49,990',
                active: true
            },
                {
                    name: 'Paul dickens',
                    job: 'Communication',
                    salary: '€ 69,201',
                    active: true
                }
            ],
        }
    }
}
</script>
<style lang="">

    /* .el-tooltip {
        color :white;
    } */
</style>