<script src="${base}/resources/js/jquery-pager.js"></script>
<#if page?has_content && page.totalPages gt 1>
<div class="dataTables_paginate paging_bootstrap pagination" id="pager"></div>
<script type="text/javascript" language="javascript">
    $(document).ready(function () {
        $("#pager").pager({ pagenumber:${page.number}, pagecount:${page.totalPages}, buttonClickCallback: PageClick });
    });
    PageClick = function (pageclickednumber) {
        var url=window.location.href;
        if(url.indexOf("?")==-1){
            window.location.href = "?page=" + pageclickednumber;
            return;
        }
        var param=window.location.search.substr(1);
        var reg = new RegExp("(^|&)page=([^&]*)(&|$)", "i");
        param=param.replace(reg,'');
        if(param!=""){
            window.location.href="?"+param+"&page="+pageclickednumber;
        }else{
            window.location.href="?page="+pageclickednumber;
        }
    }
</script>
</#if>