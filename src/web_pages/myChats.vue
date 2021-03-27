<template lang="">
    <div>
        <div id="tables">
            <div class="row">
                <div class="col-md-12 ml-auto mr-auto">
                    <card class="card-plain">
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>
                                            <el-tooltip content="Info"
                                                        :open-delay="300"
                                                        placement="top" effect="white">
                                                <n-button type="info" size="sm" icon @click.native="Hi">
                                                    <i class="now-ui-icons users_single-02" ></i>
                                                </n-button>
                                            </el-tooltip>


                                            <el-tooltip content="Settings"
                                                        :open-delay="300"
                                                        placement="top" effect="white">
                                                <n-button type="success" size="sm" icon>
                                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                                </n-button>
                                            </el-tooltip>

                                            <el-tooltip content="Delete"
                                                        :open-delay="300"
                                                        placement="top" effect="white">
                                                <n-button type="danger" size="sm" icon>
                                                    <i class="now-ui-icons ui-1_simple-remove"></i>
                                                </n-button>
                                            </el-tooltip></td>
                                        </tr>
                                    </tbody>
                                </table>
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
import {Table, TableColumn, Tooltip, Popover} from 'element-ui';
export default {
    name: 'myChats',
    bodyClass: 'myChats',
    components: {
            Card,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Tooltip.name]: Tooltip,
            [Checkbox.name]: Checkbox,
            [Popover.name]: Popover,
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
    },
    methods:{
        Hi: function(e){
            console.log("Hi", e)
        }
    }
}
</script>
<style>
.draw_share_atooltip{
    color: red;
}
</style>


