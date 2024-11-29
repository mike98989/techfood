<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OEEFollowUp extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $table="oee_follow_ups";
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }
}
