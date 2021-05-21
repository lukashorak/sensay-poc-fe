<script>     
    import {onMount} from 'svelte';
    import {compatibility} from '../utilities/DataStore';

    let parser;

    onMount(async () => {
        let pr = new UAParser();
        parser = pr.getResult();
        console.log(parser);
        checkCompatibility(parser);
        
    });

    function checkCompatibility(parser){
        compatibility.update(x => true);

        if (parser?.browser?.name === 'Line' || parser?.browser?.name === 'Facebook'){            
            compatibility.update(x => false);
        }        
    }


</script>

<style>
.fa-check {
    color: green;
 }

 .fa-times{
     color: red;
 }

</style>

<table class="table">
    <thead><th>Type</th><th>Value</th><th>Detail</th><th>Status</th></thead>
    <tbody>        
            <tr>
                <th scope="row">Browser</th>
                <td>{parser?.browser?.name}</td>
                <td>{parser?.browser?.version}</td>
                <td>
                    {#if $compatibility}<i class="fas fa-check"></i>{:else}<i class="fas fa-times"></i>{/if}
                </td>
            </tr>
            
            <tr>
                <th scope="row">OS</th>
                <td>{parser?.os?.name}</td>
                <td>{parser?.os?.version}</td>
                <td>
                    <i class="fas fa-check"></i>
                </td>
            </tr>
            <tr>
                <th scope="row">Device</th>
                <td>{parser?.device?.vendor}</td>
                <td>{parser?.device?.model}</td>
                <td>
                    <i class="fas fa-check"></i>
                </td>
            </tr>
            <tr>
                <th scope="row">Engine</th>
                <td>{parser?.engine?.name}</td>
                <td>{parser?.engine?.version}</td>
                <td>
                    <i class="fas fa-check"></i>
                </td>
            </tr>
    </tbody>
</table>